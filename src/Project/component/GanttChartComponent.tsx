import React, { useState } from "react";
import { Input } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import moment from "moment";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { TaskInterface } from "../type/Project.type";

const GanttChartComponent: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const localizer = momentLocalizer(moment);
  const [taskList, setTaskList] = useState<TaskInterface[]>([]);

  const addTask = () => {
    if (title === "") {
      alert("일정 제목을 입력해주세요");
      return;
    }

    if (!startDate || !endDate) {
      alert("시작 날짜와 종료 날짜를 선택해주세요");
      return;
    }

    if (startDate > endDate) {
      alert("유효한 날짜 범위를 선택해주세요");
      return;
    }

    const newEvent = {
      id: taskList.length + 1,
      title: title,
      start: new Date(startDate),
      end: new Date(endDate),
    };

    setTaskList((prevEvents) => [...prevEvents, newEvent]);

    setTitle("");
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="추가할 일정 이름"
        style={{ marginBottom: "10px" }}
      />
      <DateInput
        value={startDate}
        onChange={setStartDate}
        label="startDate"
        placeholder="시작 날짜"
      />
      <DateInput
        value={endDate}
        onChange={setEndDate}
        label="endDate"
        placeholder="종료 날짜"
      />

      <button onClick={addTask}>추가하기</button>

      {/* <div style={{ height: "400px", marginTop: "20px" }}>
        <Calendar
          localizer={localizer}
          events={taskList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div> */}
    </div>
  );
};

export default GanttChartComponent;
