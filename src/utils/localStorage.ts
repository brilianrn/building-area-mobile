type StoredItemKey = 'name' | 'buildings' | 'areas' | 'furnitures';

export const storeLocalStorageItem = ({
  storageKey,
  storageValue,
}: {
  storageKey: StoredItemKey;
  storageValue: string;
}) => {
  try {
    return localStorage.setItem(storageKey, storageValue);
  } catch (error) {
    return error;
  }
};

export const retrieveLocalStorageItem = (storageKey: StoredItemKey) => {
  try {
    return localStorage.getItem(storageKey);
  } catch (error) {
    return error;
  }
};

export const removeLocalStorageItem = (storageKey: StoredItemKey) => {
  try {
    return localStorage.removeItem(storageKey);
  } catch (error) {
    return error;
  }
};

export const setDocumentCookie = (value: string) => {
  return (document.cookie = value);
};

export const getDocumentCookie = () => {
  return document.cookie;
};
