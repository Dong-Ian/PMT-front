import { TokenProps } from "../../Utils/type/UtilType";

export interface CreateProjectFunctionProps extends TokenProps {
  title: string;

  projectType?: {
    value: string;
    label: string;
  } | null;
}
