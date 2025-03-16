import { View } from "react-native";

import { PhotoCard } from "../components/PhotoCard";
import { PhotoCardSkeleton } from "../components/PhotoCardSkeleton";
import { usePhotos } from "../hooks/usePhotos";


import React from "react";
import { PhotoInfo } from "../components/PhotoInfo";
import { IPhoto } from "../interfaces/photo.interface";
import { FlashList } from "@shopify/flash-list";
import { useSearchStore } from "@/modules/search/store/search.store";
export const PhotoList = () => {
 
    const { isLoading, data: photos } = usePhotos();

    const { isSearching } = useSearchStore();

    if (isLoading || isSearching) {
        return (
            <View className="py-2">
                {[1, 2, 3, 4].map((key) => (
                    <PhotoCardSkeleton key={key} />
                ))}
            </View>
        )
    }



    return (
        <View style={{ flex: 1 }}>
            <PhotoInfo />
            {
                photos?.hits.map((photo: IPhoto) => (
                    <PhotoCard key={photo.id} photo={photo} />
                ))
            }

            {/* <FlashList
                data={photos?.hits}
                renderItem={({ item }) => <PhotoCard photo={item as IPhoto} />}
                estimatedItemSize={200}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => 
                    isLoading ? (
                        <View className="py-2">
                            {[1, 2].map((key) => (
                                <PhotoCardSkeleton key={key} />
                            ))}
                        </View>
                    ) : null
                }
            /> */}
        </View> 
    );
};