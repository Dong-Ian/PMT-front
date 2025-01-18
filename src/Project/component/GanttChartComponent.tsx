import React, { useState } from "react";
import "@mantine/dates/styles.css";
import moment from "moment";
import styles from "../style/project.module.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MemoComponentProps, TaskInterface } from "../type/Project.type";
import trash_icon from "../../Utils/image/trash.png";

const GanttChartComponent: React.FC<MemoComponentProps> = ({
  item,
  EditComponentData,
  DeleteComponent,
}) => {
  const localizer = momentLocalizer(moment);

  // 그룹 (ex: 팀, 프로젝트 등)
  const groups = [
    { id: 1, title: "Group 1" },
    { id: 2, title: "Group 2" },
  ];

  // Task 데이터
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Task 1",
      start: new Date(2025, 0, 1, 9, 0),
      end: new Date(2025, 0, 1, 12, 0),
      group: 1,
    },
    {
      id: 2,
      title: "Task 2",
      start: new Date(2025, 0, 1, 13, 0),
      end: new Date(2025, 0, 1, 17, 0),
      group: 2,
    },
  ]);

  // 커스텀 이벤트 스타일링
  const eventStyleGetter = (event: TaskInterface) => {
    const groupColors = ["#FFCCBC", "#BBDEFB"]; // 그룹별 색상
    const style = {
      backgroundColor: groupColors[event.group ? event.group - 1 : 0], // 그룹에 따라 색상 선택
      borderRadius: "5px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };
    return { style };
  };

  // 커스텀 렌더링
  const CustomEvent: React.FC<{ event: TaskInterface }> = ({ event }) => (
    <span>
      <strong>{event.title}</strong>
      <p>
        {moment(event.start).format("HH:mm")} -{" "}
        {moment(event.end).format("HH:mm")}
      </p>
    </span>
  );

  return (
    <div>
      <img
        alt=""
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => DeleteComponent(item)}
        src={trash_icon}
        className={styles.icon}
      />
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        style={{ height: "600px" }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          defaultView="day" // 일 뷰를 기본으로 설정
          views={["day"]} // 하루 단위로만 표시
          step={60} // 시간 간격
          timeslots={2} // 시간 단위
          min={new Date(2025, 0, 1, 8, 0)} // 캘린더 시작 시간
          max={new Date(2025, 0, 1, 20, 0)} // 캘린더 종료 시간
          components={{
            event: CustomEvent,
          }}
          eventPropGetter={eventStyleGetter} // 이벤트 스타일 커스터마이징
        />
      </div>
    </div>
  );
};

export default GanttChartComponent;
