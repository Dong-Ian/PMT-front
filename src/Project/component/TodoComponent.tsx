import React from "react";
import { MemoComponentProps } from "../type/Project.type";

const TodoComponent: React.FC<MemoComponentProps> = ({
  index,
  item,
  setLayout,
  EditComponentData,
  DeleteComponent,
}: MemoComponentProps) => {
  return <div>todo</div>;
};

export default TodoComponent;
