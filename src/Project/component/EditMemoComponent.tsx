import React from "react";
import { EditMemoComponentProps } from "../type/Project.type";
import "@mantine/tiptap/styles.css";

const EditMemoComponent: React.FC<EditMemoComponentProps> = ({
  value,
  onChange,
}) => {
  return (
    <textarea
      onMouseDown={(e) => e.stopPropagation()}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        height: "100%",
        resize: "none",
        padding: "8px",
        fontSize: "15px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        lineHeight: "25px",
        overflowY: "scroll",
      }}
    />
  );
};

export default EditMemoComponent;
