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
  item: {
    projectSeq: string;
    w: string;
    h: string;
    x: string;
    y: string;
    i: string;
    data: string;
    type: string;
  };
}
