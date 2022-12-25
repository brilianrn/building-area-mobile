import { AxiosResponse } from 'axios';
import { FurnituresType } from '../../App.type';

import { axiosInstance } from './axios.config';
import { ResponseREST } from './response.type';

export interface GetFurnituresParams {
  buildingId?: string;
}

export interface ResponseSuccessGetFurnitures extends ResponseREST {
  data: FurnituresType[];
}

export const getFurnitures = async ({
  buildingId,
}: GetFurnituresParams): Promise<ResponseSuccessGetFurnitures> => {
  return axiosInstance
    .get(`/furnitures/${buildingId || ''}`)
    .then((res: AxiosResponse<ResponseSuccessGetFurnitures>) => res.data)
    .catch((err) => err.response.data);
};
