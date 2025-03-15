import { Text, View } from "react-native";
import { PhotoCard } from "../components/PhotoCard";



export const Photo: React.FC = () => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-xl font-bold text-gray-800">
                Photo Gallery
            </Text>
            <PhotoCard />
      </View>
    );
}