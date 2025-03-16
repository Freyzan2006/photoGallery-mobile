import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Platform } from 'react-native';

export const savePhoto = async (url: string): Promise<boolean> => {
  try {
    // Запрашиваем разрешения для медиатеки
    const { status } = await MediaLibrary.requestPermissionsAsync();
    
    if (status !== 'granted') {
      console.log('Permission not granted');
      return false;
    }

    // Генерируем уникальное имя файла
    const fileName = `photo_${Date.now()}.jpg`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    // Скачиваем файл
    const { uri } = await FileSystem.downloadAsync(url, fileUri);

    // Сохраняем в галерею
    const asset = await MediaLibrary.createAssetAsync(uri);
    
    // Опционально: создаем альбом и добавляем фото в него
    const album = await MediaLibrary.getAlbumAsync('MyPhotoApp');
    if (album === null) {
      await MediaLibrary.createAlbumAsync('MyPhotoApp', asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }

    // Удаляем временный файл
    await FileSystem.deleteAsync(uri);

    console.log('Photo saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving photo:', error);
    return false;
  }
};
