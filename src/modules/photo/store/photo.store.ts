// import { IPhoto } from "../domain/interfaces/photo.interface";
// import { create } from "zustand";

// interface IPhotoStore {
//     photos: IPhoto[];
//     setPhotos: (photos: IPhoto[]) => void;
// }

// export const usePhotoStore = create<IPhotoStore>((set) => ({
//     photos: [],
//     setPhotos: (photos: IPhoto[]) => set({ photos }),
// }));

import { create } from 'zustand';
import { IPhoto } from '../interfaces/photo.interface';

// interface PhotoStore {
//     photos: IPhoto[];
//     isLoading: boolean;
//     setPhotos: (photos: IPhoto[]) => void;
//     setLoading: (isLoading: boolean) => void;
// }

// export const usePhotoStore = create<PhotoStore>((set) => ({
//     photos: [],
//     isLoading: false,
//     setPhotos: (photos) => set({ photos }),
//     setLoading: (isLoading) => set({ isLoading }),
// }));

// interface PhotoStore {
//     photos: IPhoto[];
//     isLoading: boolean;
//     setPhotos: (photos: IPhoto[]) => void;
//     appendPhotos: (photos: IPhoto[]) => void;
//     setIsLoading: (isLoading: boolean) => void;
//   }
  
//   export const usePhotoStore = create<PhotoStore>((set) => ({
//     photos: [],
//     isLoading: false,
//     page: 1,
//     hasMore: true,
//     setPhotos: (photos) => set({ photos }),
//     appendPhotos: (newPhotos) => 
//       set((state) => ({ 
//         photos: [...state.photos, ...newPhotos] 
//       })),
//     setIsLoading: (isLoading) => set({ isLoading }),
//   }));