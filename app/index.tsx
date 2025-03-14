import { View, Text, Pressable } from "react-native";


import "@shared/styles/global.css"

function Card() {
    return (
      <View className="m-4 p-4 bg-white rounded-lg shadow-md">
        <Text className="text-lg font-bold text-gray-800 mb-2">
          Заголовок карточки
        </Text>
        
        <Text className="text-gray-600 mb-4">
          Описание карточки
        </Text>
        
        <View className="flex-row justify-between items-center">
          <Text className="text-blue-500 font-medium">
            $99.99
          </Text>
          
          <Pressable className="bg-blue-500 px-4 py-2 rounded-lg active:bg-blue-600">
            <Text className="text-white font-medium">
              Купить
            </Text>
          </Pressable>
        </View>
      </View>
    );
}

export default function Index() {
  return (
    <View>
      <Card />
    </View>
  );
}