import React from "react";
interface EditMemoComponentProps {
  value: string;
  onChange: (value: string) => void;
}

const EditMemoComponent: React.FC<EditMemoComponentProps> = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <textarea
        onMouseDown={(e) => e.stopPropagation()}
        value={value}
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
