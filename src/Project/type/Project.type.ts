import { TokenProps } from "../../Utils/type/UtilType";

export interface CreateProjectFunctionProps extends TokenProps {
  title: string;
  projectType?: {
    value: string;
    label: string;
  } | null;
}

export interface GetComponentListFunctionProps extends TokenProps {
  projectSeq: string;
}

export interface ComponentProps extends TokenProps {
  projectSeq: string;
  componentName: string;
  componentData: string;
  componentX: string;
  componentY: string;
  componentWidth: string;
  componentHeight: string;
  componentType: string;
}
