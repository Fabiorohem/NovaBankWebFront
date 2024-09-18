export interface CustomFile {
  id: number;
  name: string;
  type: string;
  fileType: string;
  visibility: string;
}

export interface StepThreeProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  values: any;
}
