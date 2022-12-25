import { useState } from 'react';
import { getFurnitures } from '../api/GET_Furnitures';

export const useFurnitures = () => {
  const [furnitureError, setFurnitureError] = useState<boolean>(false);
  const [furnitureLoading, setFurnitureLoading] = useState<boolean>(false);
  const [furnitureMessage, setFurnitureMessage] = useState<string>();

  const resetVariablesFurniture = () => {
    setFurnitureError(false);
    setFurnitureMessage(undefined);
  };

  const getFurnitureList = async (buildingId: string) => {
    setFurnitureLoading(true);
    try {
      const res = await getFurnitures({ buildingId });
      if (res?.success) {
        setFurnitureError(false);
        setFurnitureMessage(res?.message);
        setFurnitureLoading(false);
        return res.data;
      } else {
        setFurnitureMessage(res?.message);
        setFurnitureError(true);
        return setFurnitureLoading(false);
      }
    } catch (err) {
      setFurnitureLoading(false);
      return err;
    }
  };

  return {
    furnitureLoading,
    furnitureError,
    furnitureMessage,
    resetVariablesFurniture,
    getFurnitureList,
  };
};
