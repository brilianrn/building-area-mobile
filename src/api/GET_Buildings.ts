import { AxiosResponse } from 'axios';
import { BuildingType } from '../../App.type';

import { axiosInstance } from './axios.config';
import { ResponseREST } from './response.type';

export interface ResponseSuccessGetBuildings extends ResponseREST {
  data: BuildingType[];
}

export const getBuildings = async (): Promise<ResponseSuccessGetBuildings> => {
  return axiosInstance
    .get(`/buildings`)
    .then((res: AxiosResponse<ResponseSuccessGetBuildings>) => res.data)
    .catch((err) => err.response.data);
};
