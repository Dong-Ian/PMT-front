import React, { useEffect, useState } from "react";
import styles from "../style/project.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { MemoComponentProps } from "../type/Project.type";
import { Input } from "@mantine/core";

type SelectedDate = Date | null | [Date | null, Date | null];

const CalendarComponent: React.FC<MemoComponentProps> = ({
  index,
  item,
  setLayout,
  EditComponentData,
  DeleteComponent,
}: MemoComponentProps) => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [isSelectable, setIsSelectable] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");

  function modify({ index }: { index: string }) {
    const [, idx] = index.split("-");
    setEditMode(idx);
  }

  function handleCalendar(date: SelectedDate) {
    if (isSelectable) {
      setSelectedDate(date);

      const updatedData = JSON.stringify({
        data: date,
        title: title,
      });

      item.componentData = updatedData;
      EditComponentData(item);
    }
  }
  function handleComplete() {
    const updatedData = JSON.stringify({
      data: selectedDate,
      title: title,
    });

    item.componentData = updatedData;
    EditComponentData(item);
    setEditMode(null);
    setIsSelectable(false);
  }

  useEffect(() => {
    const parsedData = item.componentData ? JSON.parse(item.componentData) : {};

    setTitle(parsedData.title || "");
    setSelectedDate(parsedData.data || new Date());
  }, [item.componentData]);

  return (
    <div>
      {editMode === index ? (
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={handleComplete}
        >
          완료
        </button>
      ) : (
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => {
            modify({ index: item.layout.i });
            setIsSelectable(true);
          }}
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
      <div onMouseDown={(e) => e.stopPropagation()}>
        {isSelectable ? (
          <Input
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
            placeholder="제목 입력"
          />
        ) : (
          <p className={styles.calendar_title}>
            {item.componentData === ""
              ? "Calendar"
              : JSON.parse(item.componentData).title
              ? JSON.parse(item.componentData).title
              : "Calendar"}
          </p>
        )}

        <Calendar
          className={styles.reactCalendar}
          onChange={handleCalendar}
          value={
            item.componentData === "" ? "" : JSON.parse(item.componentData).data
          }
          calendarType="gregory"
          view="month"
          prev2Label={null}
          next2Label={null}
          showNeighboringMonth={false}
          selectRange={true}
          formatDay={(locale, date) => moment(date).format("D")}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
