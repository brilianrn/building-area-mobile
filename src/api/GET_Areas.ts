import { AxiosResponse } from 'axios';
import { AreaType } from '../../App.type';

import { axiosInstance } from './axios.config';
import { ResponseREST } from './response.type';

export interface GetAreasParams {
  buildingId: string;
}

export interface ResponseSuccessGetAreas extends ResponseREST {
  data: AreaType[];
}

export const getAreas = async ({
  buildingId,
}: GetAreasParams): Promise<ResponseSuccessGetAreas> => {
  return axiosInstance
    .get(`/areas/${buildingId}`)
    .then((res: AxiosResponse<ResponseSuccessGetAreas>) => res.data)
    .catch((err) => err.response.data);
};
