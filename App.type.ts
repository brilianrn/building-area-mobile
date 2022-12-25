export interface FurnituresType {
  id?: string;
  areaId: string;
  buildingId?: string;
  name: string;
  path: string;
  positionX: number;
  positionY: number;
  isUpdate?: boolean;
}

export interface FormBuildingProps {
  setShowModal: (value: boolean) => void;
  showModal: boolean;
  onSubmit?: (prop: BuildingType) => void;
}

export interface AreaType {
  id?: string;
  name: string;
  positionX: number;
  positionY: number;
}

export interface FormPropsFurniture {
  setShowModal: (value: boolean) => void;
  setIsDelete?: (value: boolean) => void;
  showModal: boolean;
  onSubmit?: (prop: FurnituresType) => void;
  onDelete?: () => void;
  data?: FurnituresType;
  isUpdateData?: boolean;
  isSeeDetail?: boolean;
  isDelete?: boolean;
  buildingId?: string;
}

export interface FormAreaProps {
  setShowModal: (value: boolean) => void;
  setIsDelete?: (value: boolean) => void;
  showModal: boolean;
  onSubmit?: (prop: AreaType) => void;
  onDelete?: () => void;
  data?: AreaType;
  isUpdateData?: boolean;
  isSeeDetail?: boolean;
  isDelete?: boolean;
  buildingId?: string;
}

export interface BuildingType {
  id?: string;
  name: string;
}

export interface AreaType {
  id?: string;
  name: string;
  buildingId: string;
  className?: string;
  positionX: number;
  positionY: number;
  isUpdate?: boolean;
}
