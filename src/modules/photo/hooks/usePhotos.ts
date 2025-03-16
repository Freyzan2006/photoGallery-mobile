

// import { useSearchStore } from "@/modules/search/store/search.store";
// import { usePhotoStore } from "../../store/photo.store";
// import { photoService } from "../../domain/services/PhotoService";
import { useQuery } from "@tanstack/react-query";

import { useSearchStore } from "@/modules/search/store/search.store";
import { photoService } from "../services/PhotoService";




// const fetchPhotos = async () => {
//     try {
       
//         usePhotoStore.setState({ isLoading: true })
//         const query = useSearchStore.getState().query
//         const response = await photoService.getPhotos(query);
//         console.log(response)
//         usePhotoStore.setState({ photos: response.hits })
//         return response
//     } catch (error) {
//         console.error('Error fetching photos:', error);
//     } finally {
//         usePhotoStore.setState({ isLoading: false })
//     }
// };







export function usePhotos() {
  return useQuery({
    queryKey: ['photos'],
    queryFn: () => photoService.getPhotos(useSearchStore.getState().query),
  });
}



