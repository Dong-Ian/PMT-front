import { TokenProps } from "../../Utils/type/UtilType";

export interface CreateProjectFunctionProps extends TokenProps {
  title: string;
  inviteUsers: string[];
  projectType?: {
    value: string;
    label: string;
  } | null;
}
