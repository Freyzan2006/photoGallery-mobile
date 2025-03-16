

import { Text, View } from "react-native";



import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { PhotoList } from "../widgets/PhotoList";
import { Search } from "@/modules/search/ui/components/Search";

export const Photo: React.FC = () => {
    return (
        <GestureHandlerRootView>
            <ScrollView className="flex-1 bg-gray-100">
                <View className="flex-col justify-center items-center w-full">
                    <View className="w-full px-4 py-2">
                        <Logo />
                    </View>
                    <Search />
                </View>
                <PhotoList />
            </ScrollView>
        </GestureHandlerRootView>
       
    );
};import { Logo } from "@/shared/ui/Logo";
