import React, { useState } from "react";
import styles from "../style/project.module.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { ScrollArea } from "@mantine/core";

import pen_icon from "../../Utils/image/pen.png";
import check_icon from "../../Utils/image/check.png";
import trash_icon from "../../Utils/image/trash.png";

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

  const modify = ({ index }: { index: string }) => {
    const [, idx] = index.split("-");
    setEditMode(idx);
  };

  const handleInputChange = (index: string, value: string) => {
    setLayout((prevLayout) =>
      prevLayout.map((item) =>
        item.layout.i === index ? { ...item, componentData: value } : item
      )
    );
  };

  return (
    <>
      {editMode === index ? (
        <img
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => {
            setEditMode(null);
            EditComponentData(item);
          }}
          src={check_icon}
          alt=""
          className={styles.icon}
        />
      ) : (
        <img
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onClick={() => modify({ index: item.layout.i })}
          src={pen_icon}
          alt=""
          className={styles.icon}
        />
      )}

      <img
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => DeleteComponent(item)}
        src={trash_icon}
        alt=""
        className={styles.icon}
      />
      {editMode === index ? (
        <div className={styles.component_div}>
          <EditMemoComponent
            value={item.componentData || ""}
            onChange={(newValue) => handleInputChange(item.layout.i, newValue)}
          />
        </div>
      ) : (
        <ScrollArea h={"calc(100% - 30px)"} style={{ padding: "10px" }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              img: ({ node, ...props }) => (
                <img
                  {...props}
                  alt=""
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              ),
            }}
          >
            {item.componentData}
          </ReactMarkdown>
        </ScrollArea>
      )}
    </>
  );
};

export default MemoComponent;
