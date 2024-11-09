import React, { useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import EditMemoComponent from "../component/EditMemoComponent";

const ProjectPage: React.FC = () => {
  const initialLayout: Layout[] = [
    {
      i: "item-1",
      x: 0,
      y: 0,
      w: 3,
      h: 3,
      maxH: 10,
      maxW: 10,
      minH: 2,
      minW: 3,
      isResizable: true,
      isDraggable: true,
      isBounded: false,
      resizeHandles: ["se", "sw"],
    },
    {
      i: "item-2",
      x: 3,
      y: 0,
      w: 3,
      h: 3,
      maxH: 10,
      maxW: 10,
      minH: 2,
      minW: 3,
      isResizable: true,
      isDraggable: true,
      isBounded: false,
      resizeHandles: ["se", "sw"],
    },
    {
      i: "item-3",
      x: 6,
      y: 0,
      w: 3,
      h: 3,
      maxH: 10,
      maxW: 10,
      minH: 2,
      minW: 3,
      isResizable: true,
      isDraggable: true,
      isBounded: false,
      resizeHandles: ["se", "sw"],
    },
  ];

  const [layout, setLayout] = useState<Layout[]>(initialLayout);
  const [counter, setCounter] = useState(4);
  const [editMode, setEditMode] = useState<string | null>(null);

  const addItem = () => {
    const maxY = layout.reduce(
      (max, item) => Math.max(max, item.y + item.h),
      0
    );

    const newItem: Layout = {
      i: `item-${counter}`,
      x: 0,
      y: maxY,
      w: 3,
      h: 3,
      maxH: 10,
      maxW: 10,
      minH: 2,
      minW: 3,
      isResizable: true,
      isDraggable: true,
      isBounded: false,
      resizeHandles: ["se", "sw"],
    };

    setLayout([...layout, newItem]);
    setCounter(counter + 1);
  };

  const addTodo = () => {
    const maxY = layout.reduce(
      (max, item) => Math.max(max, item.y + item.h),
      0
    );

    const newItem: Layout = {
      i: `todo-${counter}`,
      x: 0,
      y: maxY,
      w: 3,
      h: 3,
      maxH: 10,
      maxW: 10,
      minH: 2,
      minW: 3,
      isResizable: true,
      isDraggable: true,
      isBounded: false,
      resizeHandles: ["se", "sw"],
    };

    setLayout([...layout, newItem]);
    setCounter(counter + 1);
  };

  const addMemo = () => {
    const maxY = layout.reduce(
      (max, item) => Math.max(max, item.y + item.h),
      0
    );

    const newItem: Layout = {
      i: `memo-${counter}`,
      x: 0,
      y: maxY,
      w: 3,
      h: 3,
      maxH: 10,
      maxW: 10,
      minH: 2,
      minW: 3,
      isResizable: true,
      isDraggable: true,
      isBounded: false,
      resizeHandles: ["se", "sw"],
    };

    setLayout([...layout, newItem]);
    setCounter(counter + 1);
  };

  const modify = ({ index }: { index: string }) => {
    const [type, idx] = index.split("-");
    setEditMode(idx);
  };
  console.log(layout);

  return (
    <div style={{ overflowX: "auto", height: "100vh" }}>
      <button onClick={addItem} style={{ marginBottom: "10px" }}>
        + Add Item
      </button>
      <button onClick={addMemo} style={{ marginBottom: "10px" }}>
        + Add Memo
      </button>
      <button onClick={addTodo} style={{ marginBottom: "10px" }}>
        + Add Todo
      </button>

      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        preventCollision={true}
        isDraggable={true}
        isResizable={true}
        margin={[30, 30]}
        containerPadding={[10, 10]}
        compactType={null}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
      >
        {layout.map((item) => {
          const [type, index] = item.i.split("-");

          if (type === "todo") {
            return (
              <div
                key={item.i}
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                {editMode === index ? (
                  <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => setEditMode(null)}
                  >
                    완료
                  </button>
                ) : (
                  <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => modify({ index: item.i })}
                  >
                    수정
                  </button>
                )}
                {editMode === index ? (
                  <div>todo 수정</div>
                ) : (
                  <div>todo 내용</div>
                )}
              </div>
            );
          }

          if (type === "memo") {
            return (
              <div
                key={item.i}
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                {editMode === index ? (
                  <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => setEditMode(null)}
                  >
                    완료
                  </button>
                ) : (
                  <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => modify({ index: item.i })}
                  >
                    수정
                  </button>
                )}
                {editMode === index ? (
                  <div>
                    <EditMemoComponent />
                  </div>
                ) : (
                  <div>memo 내용</div>
                )}
              </div>
            );
          }

          return (
            <div
              key={item.i}
              style={{
                border: "1px solid black",
                padding: "10px",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {editMode === index ? (
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => setEditMode(null)}
                >
                  완료
                </button>
              ) : (
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => modify({ index: item.i })}
                >
                  수정
                </button>
              )}
              {editMode === index ? <div>item 수정</div> : <div>item 내용</div>}
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};

export default ProjectPage;
