import { useState } from 'react';
import { getAreas, GetAreasParams } from '../api/GET_Areas';

export const useAreas = () => {
  const [areaError, setAreaError] = useState<boolean>(false);
  const [areaLoading, setAreaLoading] = useState<boolean>(false);
  const [areaMessage, setAreaMessage] = useState<string>();

  const resetVariablesBuilding = () => {
    setAreaError(false);
    setAreaMessage(undefined);
  };

  const getAreaList = async (payload: GetAreasParams) => {
    setAreaLoading(true);
    try {
      const { data, message, success } = await getAreas(payload);
      if (success) {
        setAreaError(false);
        setAreaMessage(message);
        setAreaLoading(false);
        return data;
      } else {
        setAreaMessage(message);
        setAreaError(true);
        return setAreaLoading(false);
      }
    } catch (err) {
      setAreaLoading(false);
      return err;
    }
  };

  return {
    areaLoading,
    areaError,
    areaMessage,
    resetVariablesBuilding,
    getAreaList,
  };
};
