import { TokenProps } from "../../Utils/type/UtilType";

export interface CreateProjectFunctionProps extends TokenProps {
  title: string;
  projectCategory: {
    value: string;
    label: string;
  } | null;
  projectType?: string;
}

export interface GetComponentListFunctionProps extends TokenProps {
  projectSeq: string;
}

export interface ComponentProps extends TokenProps {
  item: {
    projectSeq?: string;
    componentSeq?: string;
    data?: string;
    type?: string;
    i?: string;
    w: string;
    h: string;
    x: string;
    y: string;
  };
}

export interface LayoutInterface {
  projectSeq: string; // 프로젝트 ID
  componentSeq: string; // 컴포넌트 ID
  componentName: string; // 컴포넌트 이름
  componentData: string; // 컴포넌트 데이터
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string; // type-counter로 구성
    maxH: number;
    maxW: number;
    minH: number;
    minW: number;
    isResizable: boolean;
    isDraggable: boolean;
    isBounded: boolean;
    resizeHandles: ["se", "sw"];
  };
}

export interface MemoComponentProps {
  index: string;
  item: LayoutInterface;
  setLayout: React.Dispatch<React.SetStateAction<LayoutInterface[]>>;
  EditComponentData: (item: LayoutInterface) => Promise<void>;
  DeleteComponent: (item: LayoutInterface) => Promise<void>;
}

export interface InviteProps extends TokenProps {
  projectSeq: string;
  member: string;
}

export interface EditMemoComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export interface TodoInterface {
  todo: string;
  isComplete: boolean;
}

export interface TodosInterface {
  title: string;
  todos: TodoInterface[];
}

export interface TaskInterface {
  id: number;
  title: string;
  start: Date;
  end: Date;
  group?: number;
}
