import { Text, View } from "react-native"
import { usePhotos } from "../hooks/usePhotos"


export const PhotoInfo = () => {
    const { data: photos } = usePhotos()
    return (
        <View>
            <Text>Всего есть: {photos?.total}</Text>
            <Text>Найдено похожих: {photos?.totalHits}</Text>
        </View>
    )
}