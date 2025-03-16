import { BaseService } from "@/shared/services/BaseService";
import axios from "axios";

import { apiKeys, apiRoutes } from "@/shared/services/api";
import { useSearchStore } from "@/modules/search/store/search.store";
import { IPhotoResponse } from "../interfaces/photo.interface";

// https://pixabay.com/api/?key=49306912-b037ab6eaa4cba9cfeffbd8d9&q=yellow+flowers&image_type=photo

export class PhotoService extends BaseService {


    public async getPhotos(query?: string) : Promise<IPhotoResponse> {
        // const response = await axios.get(`${this.getBaseUrl()}${apiRoutes.photos.get}`, {
        //     params: {
        //         key: this.getApiKey(),
        //         q: query,
        //         image_type: "photo",
        //     },
        // });
     
      
   
        if (query) {
        
            const response = await axios.get(this.getBaseUrl(), {
                params: {
                    key: this.getApiKey(),
                    q: query,
                    image_type: "photo",
                },
            })
            
            console.log(response.data)
            return response.data;
        }
        const response = await axios.get(this.getBaseUrl(), {
            params: {
                key: this.getApiKey(),
                q: "yellow+flowers",
                image_type: "photo",
            },
        })
      
        return response.data;
            
      
           
        
        

    }

   
}

export const photoService = new PhotoService(apiRoutes.baseUrl, apiKeys.pixabay);