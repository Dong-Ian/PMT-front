import React, { useState } from "react";

import EditMemoComponent from "./EditMemoComponent";
import { MemoComponentProps } from "../type/Project.type";

const MemoComponent: React.FC<MemoComponentProps> = ({
  index,
  item,
  setLayout,
  EditComponentData,
  DeleteComponent,
}: MemoComponentProps) => {
  const [editMode, setEditMode] = useState<string | null>(null);

  function modify({ index }: { index: string }) {
    const [, idx] = index.split("-");
    setEditMode(idx);
  }

  function handleInputChange(index: string, value: string) {
    setLayout((prevLayout) =>
      prevLayout.map((item) =>
        item.layout.i === index ? { ...item, componentData: value } : item
      )
    );
  }

  return (
    <>
      {editMode === index ? (
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => {
            setEditMode(null);
            EditComponentData(item);
          }}
        >
          완료
        </button>
      ) : (
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => modify({ index: item.layout.i })}
        >
          수정
        </button>
      )}
      <button
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => DeleteComponent(item)}
      >
        삭제
      </button>
      {editMode === index ? (
        <div>
          <EditMemoComponent
            value={item.componentData || ""}
            onChange={(newValue) => handleInputChange(item.layout.i, newValue)}
          />
        </div>
      ) : (
        <div>{item.componentData}</div>
      )}
    </>
  );
};

export default MemoComponent;
