import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../Utils/Atom/Atom";

import styles from "../style/project.module.css";

import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import GetComponentListFunction from "../function/GetComponentListFunction";
import CreateComponentFunction from "../function/CreateComponentFunction";
import MoveComponentFunction from "../function/MoveComponentFunction";
import EditComponentDataFunction from "../function/EditComponentDataFunction";
import DeleteComponentFunction from "../function/DeleteComponentFunction";

import { LayoutInterface } from "../type/Project.type";
import InviteMemberComponent from "../component/InviteMemberComponent";
import MemoComponent from "../component/MemoComponent";
import CalendarComponent from "../component/CalendarComponent";
import TodoComponent from "../component/TodoComponent";
import GanttChartComponent from "../component/GanttChartComponent";

const ProjectPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const projectSeq = searchParams.get("projectSeq");
  const token = useRecoilValue(tokenState);
  const previousLayoutRef = useRef<LayoutInterface[]>([]);

  const [layout, setLayout] = useState<LayoutInterface[]>([]);
  const [counter, setCounter] = useState(0);

  async function addComponent(type: "memo" | "calendar" | "todo" | "gant") {
    const maxY = layout.reduce(
      (max, item) => Math.max(max, item.layout.y + item.layout.h),
      0
    );

    const baseSettings = {
      memo: { w: 4, h: 4, isResizable: true },
      calendar: { w: 10, h: 15, isResizable: false },
      todo: { w: 4, h: 4, isResizable: true },
      gant: { w: 10, h: 12, isResizable: false },
    };

    const settings = baseSettings[type];

    const newItem: LayoutInterface = {
      projectSeq: projectSeq || "0",
      componentSeq: "",
      componentName: `${type}-${counter}`,
      componentData: "",
      layout: {
        i: `${type}-${counter}`,
        x: 0,
        y: maxY,
        w: settings.w,
        h: settings.h,
        maxH: 15,
        maxW: 10,
        minH: 4,
        minW: 4,
        isResizable: settings.isResizable,
        isDraggable: true,
        isBounded: false,
        resizeHandles: ["se", "sw"],
      },
    };

    const updatedLayout = [...layout, newItem];
    setLayout(updatedLayout);
    setCounter((prev) => prev + 1);

    await CreateComponent(newItem.layout);
  }

  function initializeCounter(layouts: LayoutInterface[]) {
    const maxCounter = layouts.reduce((max, item) => {
      const parts = item.layout.i.split("-");
      const num = Number(parts[parts.length - 1]) || 0;
      return Math.max(max, num);
    }, 0);

    setCounter(maxCounter + 1);
  }

  async function handleLayoutChange(newLayout: Layout[]) {
    const mappedLayout: LayoutInterface[] = layout.map((item) => {
      const updatedLayout = newLayout.find(
        (newItem) => newItem.i === item.layout.i
      );

      if (updatedLayout) {
        return {
          ...item,
          layout: {
            ...item.layout,
            x: updatedLayout.x,
            y: updatedLayout.y,
            w: updatedLayout.w,
            h: updatedLayout.h,
          },
        };
      }
      return item;
    });

    const changedItem = mappedLayout.find((newItem, index) => {
      const oldItem = previousLayoutRef.current[index];
      return (
        oldItem &&
        (oldItem.layout.x !== newItem.layout.x ||
          oldItem.layout.y !== newItem.layout.y ||
          oldItem.layout.w !== newItem.layout.w ||
          oldItem.layout.h !== newItem.layout.h)
      );
    });

    if (changedItem && projectSeq) {
      const result = await MoveComponentFunction({
        token,
        item: {
          projectSeq: projectSeq,
          componentSeq: changedItem.componentSeq,
          x: changedItem.layout.x.toString(),
          y: changedItem.layout.y.toString(),
          w: changedItem.layout.w.toString(),
          h: changedItem.layout.h.toString(),
        },
      });

      if (result.code === "0000") {
        GetComponentList();
      }
    }
    previousLayoutRef.current = mappedLayout;
  }

  async function GetComponentList() {
    if (projectSeq) {
      const result = await GetComponentListFunction({
        token: token,
        projectSeq: projectSeq,
      });

      if (result.result) {
        const layouts = result.result.map((item: any) => {
          const isCalendar = item.componentName.startsWith("calendar");
          const isGant = item.componentName.startsWith("gant");

          return {
            projectSeq: projectSeq,
            componentSeq: item.componentSeq,
            componentName: item.componentName,
            componentData: item.componentData,
            layout: {
              x: parseInt(item.componentX),
              y: parseInt(item.componentY),
              w: isCalendar || isGant ? 12 : parseInt(item.componentWidth),
              h: isCalendar || isGant ? 15 : parseInt(item.componentHeight),
              i: item.componentName,
              maxH: 15,
              maxW: 12,
              minH: 4,
              minW: 4,
              isResizable: !isCalendar && !isGant,
              isDraggable: true,
              isBounded: false,
              resizeHandles: isCalendar || isGant ? [] : ["se", "sw"],
            },
          };
        });

        setLayout(layouts);
        return;
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
          data: "",
          type: "memo",
        },
      });

      if (result.code === "COMPONENT0000") {
        GetComponentList();
      }
    }
  }

  async function EditComponentData(item: LayoutInterface) {
    const currentItem = layout.find((l) => l.layout.i === item.layout.i) || {
      componentData: "",
    };

    if (projectSeq) {
      const result = await EditComponentDataFunction({
        token,
        item: {
          x: item.layout.x.toString(),
          y: item.layout.y.toString(),
          h: item.layout.h.toString(),
          w: item.layout.w.toString(),
          projectSeq: projectSeq,
          componentSeq: item.componentSeq,
          i: item.layout.i,
          data: currentItem.componentData,
          type: "memo",
        },
      });

      if (result.code === "0000") {
        GetComponentList();
      }
    }
  }

  async function DeleteComponent(item: LayoutInterface) {
    const res = window.confirm("컴포넌트를 삭제하시겠습니까?");
    if (res && projectSeq) {
      const result = await DeleteComponentFunction({
        token,
        item: {
          x: item.layout.x.toString(),
          y: item.layout.y.toString(),
          h: item.layout.h.toString(),
          w: item.layout.w.toString(),
          projectSeq: projectSeq,
          componentSeq: item.componentSeq,
          i: item.layout.i,
          data: "",
          type: "memo",
        },
      });

      if (result.code === "0000") {
        GetComponentList();
      }
    }
  }

  useEffect(() => {
    GetComponentList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (layout.length > 0) {
      initializeCounter(layout);
    }
  }, [layout]);

  return (
    <div className={styles.project_outer_container}>
      <div className={styles.top_bar}>
        <button
          onClick={() => addComponent("memo")}
          style={{ marginBottom: "10px" }}
        >
          + Add Memo
        </button>
        <button
          onClick={() => addComponent("calendar")}
          style={{ marginBottom: "10px" }}
        >
          + Add Calendar
        </button>
        <button
          onClick={() => addComponent("todo")}
          style={{ marginBottom: "10px" }}
        >
          + Add Todo
        </button>
        <button
          onClick={() => addComponent("gant")}
          style={{ marginBottom: "10px" }}
        >
          + Add Gantt
        </button>
        {projectSeq && (
          <InviteMemberComponent token={token} projectSeq={projectSeq} />
        )}
      </div>
      <div className={styles.project_container}>
        <GridLayout
          className="layout"
          layout={layout.map((item) => item.layout)}
          cols={50}
          rowHeight={30}
          width={5000}
          preventCollision={true}
          isDraggable={true}
          isResizable={true}
          margin={[30, 30]}
          containerPadding={[10, 10]}
          compactType={null}
          onLayoutChange={handleLayoutChange}
          allowOverlap={true}
        >
          {layout.map((item) => {
            const [type, index] = item.layout.i.split("-");
            const componentMap: Record<string, React.FC<any>> = {
              memo: MemoComponent,
              calendar: CalendarComponent,
              todo: TodoComponent,
              gant: GanttChartComponent,
            };

            const Component = componentMap[type];
            if (!Component) return null;

            return (
              <div className={styles.component_box} key={item.layout.i}>
                <Component
                  index={index}
                  item={item}
                  setLayout={setLayout}
                  EditComponentData={EditComponentData}
                  DeleteComponent={DeleteComponent}
                />
              </div>
            );
          })}
        </GridLayout>
      </div>
    </div>
  );
};

export default ProjectPage;
