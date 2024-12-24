import React from "react";
import { EditMemoComponentProps } from "../type/Project.type";

const stripHtmlTags = (html: string): string => {
  return html.replace(/<\/p>/g, "\n").replace(/<[^>]*>/g, "");
};

const EditMemoComponent: React.FC<EditMemoComponentProps> = ({
  value,
  onChange,
}) => {
  const strippedValue = stripHtmlTags(value);

  return (
    <div>
      <textarea
        onMouseDown={(e) => e.stopPropagation()}
        value={strippedValue}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          height: "100%",
          resize: "none",
          padding: "8px",
          fontSize: "14px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default EditMemoComponent;
