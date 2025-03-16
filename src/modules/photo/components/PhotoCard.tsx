import { ActivityIndicator, Alert, Button, Image, Share, Text, View } from "react-native";

import { Pressable, Swipeable } from 'react-native-gesture-handler';
import { useState, useRef } from "react";
import { useThemeColor } from "@/shared/hooks/useThemeColor";
import { IPhoto } from "../interfaces/photo.interface";

import * as Haptics from 'expo-haptics';
import { savePhoto } from "@/shared/utils/savePhoto";
import { usePhotos } from "../hooks/usePhotos";

interface IPhotoCardProps {
  photo: IPhoto;
}

export const PhotoCard: React.FC<IPhotoCardProps> = ({ photo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const swipeableRef = useRef<Swipeable>(null);

  const backgroundColor = useThemeColor({}, 'cardBackground');
  const textColor = useThemeColor({}, 'text');


  const handleShare = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await Share.share({
        url: photo.largeImageURL,
        message: `Посмотри какое классное фото!\nАвтор: ${photo.user}\nТеги: ${photo.tags}`,
        title: 'Поделиться фото'
      });
    } catch (error) {
      console.error('Error sharing photo:', error);
      Alert.alert('Ошибка', 'Не удалось поделиться фото');
    } finally {
      swipeableRef.current?.close();
    }
  };
  
  const handleSave = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const success = await savePhoto(photo.largeImageURL);
      if (success) {
        Alert.alert('Успех', 'Фото успешно сохранено');
      } else {
        Alert.alert('Ошибка', 'Не удалось сохранить фото');
      }
    } catch (error) {
      console.error('Error saving photo:', error);
      Alert.alert('Ошибка', 'Произошла ошибка при сохранении фото');
    } finally {
      // Возвращаем карточку в исходное положение
      swipeableRef.current?.close();
    }
  };

  const renderRightActions = () => {
    return (

      <View className="flex-1 flex-row bg-blue-500 justify-center items-center pr-4 gap-2">
        <ActivityIndicator size="large" color="white" />

      </View>
    );
  };

  const renderLeftActions = () => {
    return (
      <View className="flex-1 flex-row bg-green-500 justify-center items-center pr-4 gap-2">
        <ActivityIndicator size="large" color="white" />

      </View>
    );
  };

  return (
    <View>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        onSwipeableOpen={(direction) => {
          setIsOpen(true);
          if (direction === 'left') { // свайп вправо (показывает левое действие)
            handleSave();
          } else if (direction === 'right') { // свайп влево (показывает правое действие)
            handleShare();
          }
        }}
        onSwipeableClose={() => setIsOpen(false)}
      >
        <View 
          className={`m-4 p-4 rounded-lg shadow-md ${isOpen ? 'opacity-80' : ''}`}
          style={{ backgroundColor }}
        >
          <Image
            source={{ uri: photo.webformatURL }}
            className="w-full h-40 rounded-lg"
          />
          <View>
            <Text style={{ color: textColor }}>{ photo.previewWidth }X{ photo.previewWidth }</Text>
            <Text style={{ color: textColor }}>ID: {photo.id}</Text>
            <Text style={{ color: textColor }}>User: {photo.user}</Text>
            <Text style={{ color: textColor }}>Likes: {photo.likes}</Text>
            <Text style={{ color: textColor }}>Comments: {photo.comments}</Text>
            <Text style={{ color: textColor }}>Downloads: {photo.downloads}</Text>
            <Text style={{ color: textColor }}>Tags: {photo.tags}</Text>
          </View>
        </View>
      </Swipeable>
    </View>
  );
};