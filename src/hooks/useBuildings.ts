import { useState } from 'react';
import { getBuildings } from '../api/GET_Buildings';
import { storeLocalStorageItem } from '../utils/localStorage';

export const useBuildings = () => {
  const [buildingError, setBuildingError] = useState<boolean>(false);
  const [buildingLoading, setBuildingLoading] = useState<boolean>(false);
  const [buildingMessage, setBuildingMessage] = useState<string>();

  const resetVariablesBuilding = () => {
    setBuildingError(false);
    setBuildingMessage(undefined);
  };

  const getBuildingList = async () => {
    setBuildingLoading(true);
    try {
      const { data, message, success } = await getBuildings();
      if (success) {
        setBuildingError(false);
        setBuildingMessage(message);
        setBuildingLoading(false);
        return storeLocalStorageItem({
          storageKey: 'buildings',
          storageValue: 'JSON.stringify(data)',
        });
      } else {
        setBuildingMessage(message);
        setBuildingError(true);
        return setBuildingLoading(false);
      }
    } catch (err) {
      setBuildingLoading(false);
      return err;
    }
  };

  return {
    buildingLoading,
    buildingError,
    buildingMessage,
    resetVariablesBuilding,
    getBuildingList,
  };
};
