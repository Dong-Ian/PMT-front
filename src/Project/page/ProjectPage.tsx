import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../Utils/Atom/Atom";

import styles from "../style/project.module.css";

import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import EditMemoComponent from "../component/EditMemoComponent";
import GetComponentListFunction from "../function/GetComponentListFunction";
import CreateComponentFunction from "../function/CreateComponentFunction";
import MoveComponentFunction from "../function/MoveComponentFunction";
import { LayoutInterface } from "../type/Project.type";

const ProjectPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const projectSeq = searchParams.get("projectSeq");
  const token = useRecoilValue(tokenState);

  const [layout, setLayout] = useState<LayoutInterface[]>([]);
  const [counter, setCounter] = useState(0);
  const [editMode, setEditMode] = useState<string | null>(null);

  // const addMemo = () => {
  //   console.log(counter);
  //   const maxY = layout.reduce(
  //     (max, item) => Math.max(max, item.y + item.h),
  //     0
  //   );

  //   const newItem: Layout = {
  //     i: `memo-${counter}`,
  //     x: 0,
  //     y: maxY,
  //     w: 3,
  //     h: 3,
  //     maxH: 10,
  //     maxW: 10,
  //     minH: 2,
  //     minW: 3,
  //     isResizable: true,
  //     isDraggable: true,
  //     isBounded: false,
  //     resizeHandles: ["se", "sw"],
  //   };

  //   setLayout([...layout, newItem]);
  //   setCounter(counter + 1);
  // };

  // const modify = ({ index }: { index: string }) => {
  //   const [type, idx] = index.split("-");
  //   setEditMode(idx);
  // };

  async function GetComponentList() {
    if (projectSeq) {
      const result = await GetComponentListFunction({
        token: token,
        projectSeq: projectSeq,
      });

      if (result.result) {
        const layouts = result.result.map((item: any) => ({
          projectSeq: projectSeq,
          componentSeq: item.componentSeq,
          componentName: item.componentName,
          componentData: item.componentData,
          layout: {
            x: parseInt(item.componentX),
            y: parseInt(item.componentY),
            w: parseInt(item.componentWidth),
            h: parseInt(item.componentHeight),
            i: item.componentName,
            maxH: 10,
            maxW: 10,
            minH: 2,
            minW: 3,
            isResizable: true,
            isDraggable: true,
            isBounded: false,
            resizeHandles: ["se", "sw"],
          },
        }));

        setLayout(layouts);
      }
    }
  }

  async function CreateComponent(item: Layout) {
    if (projectSeq) {
      const result = await CreateComponentFunction({
        token,
        item: {
          x: item.x.toString(),
          y: item.y.toString(),
          h: item.h.toString(),
          w: item.w.toString(),
          projectSeq: projectSeq,
          i: item.i,
          data: "hello",
          type: "memo",
        },
      });

      if (result.code === "COMPONENT0000") {
        GetComponentList();
      }
    }
  }

  // const initializeCounter = (layouts: LayoutInterface[]) => {
  //   const maxCounter = layouts.reduce((max, item) => {
  //     const parts = item.i.split("-");
  //     const num = Number(parts[parts.length - 1]) || 0;
  //     return Math.max(max, num);
  //   }, 0);

  //   setCounter(maxCounter + 1);
  // };

  // async function handleLayoutChange  (newLayout: Layout[])  {
  //   const changedItem = newLayout.find((newItem) => {
  //     const oldItem = layout.find((item) => item.i === newItem.i);
  //     return (
  //       oldItem &&
  //       (oldItem.x !== newItem.x ||
  //         oldItem.y !== newItem.y ||
  //         oldItem.w !== newItem.w ||
  //         oldItem.h !== newItem.h)
  //     );
  //   });

  //   if (changedItem) {
  //     console.log("Changed Layout Item:", changedItem);
  //     const result = await MoveComponentFunction({token, item: {
  //       x: changedItem.x.toString(),
  //       y: changedItem.y.toString(),
  //       h: changedItem.h.toString(),
  //       w: changedItem.w.toString(),

  //     },})
  //   }

  //   setLayout(newLayout);
  // };

  useEffect(() => {
    GetComponentList();
  }, []);

  // useEffect(() => {
  //   if (layout.length > 0) {
  //     initializeCounter(layout);
  //   }
  // }, [layout]);

  return (
    <div className={styles.project_outer_container}>
      {/* <button onClick={addMemo} style={{ marginBottom: "10px" }}>
        + Add Memo
      </button> */}

      <GridLayout
        className="layout"
        layout={layout.map((item) => item.layout)}
        cols={12}
        rowHeight={30}
        width={1200}
        preventCollision={true}
        isDraggable={true}
        isResizable={true}
        margin={[30, 30]}
        containerPadding={[10, 10]}
        compactType={null}
        // onLayoutChange={handleLayoutChange}
      >
        {layout.map((item) => {
          const [type, index] = item.layout.i.split("-");

          return (
            <div key={item.layout.i} className={styles.component_box}>
              {editMode === index ? (
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => {
                    setEditMode(null);
                    CreateComponent(item.layout);
                  }}
                >
                  완료
                </button>
              ) : (
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  // onClick={() => modify({ index: item.layout.i })}
                >
                  수정
                </button>
              )}
              {editMode === index ? (
                <div>
                  <EditMemoComponent />
                </div>
              ) : (
                <div>{item.componentData}</div>
              )}
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};

export default ProjectPage;
