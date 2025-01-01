import React, { useEffect, useState } from "react";
import styles from "../style/project.module.css";
import moment from "moment";
import { Input, Modal, Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MemoComponentProps, TaskInterface } from "../type/Project.type";
import trash_icon from "../../Utils/image/trash.png";

const CalendarComponent: React.FC<MemoComponentProps> = ({
  item,
  EditComponentData,
  DeleteComponent,
}: MemoComponentProps) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const localizer = momentLocalizer(moment);
  const [taskList, setTaskList] = useState<TaskInterface[]>([]);

  const [modalOpened, setModalOpened] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskInterface | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newStartDate, setNewStartDate] = useState<Date | null>(null);
  const [newEndDate, setNewEndDate] = useState<Date | null>(null);

  const addTask = () => {
    if (taskTitle === "") {
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
      title: taskTitle,
      start: new Date(startDate),
      end: new Date(endDate),
    };

    const updatedTaskList = [...taskList, newEvent];

    setTaskList(updatedTaskList);

    item.componentData = JSON.stringify({
      title: taskTitle,
      data: updatedTaskList,
    });
    EditComponentData(item);

    setTaskTitle("");
    setStartDate(null);
    setEndDate(null);
  };

  const editTask = () => {
    if (!newTitle || !newStartDate || !newEndDate) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    if (newStartDate > newEndDate) {
      alert("유효한 날짜 범위를 선택해주세요");
      return;
    }

    const updatedTaskList = taskList.map((task) =>
      task.id === selectedTask?.id
        ? {
            ...task,
            title: newTitle,
            start: newStartDate,
            end: newEndDate,
          }
        : task
    );

    setTaskList(updatedTaskList);

    item.componentData = JSON.stringify({
      title: "캘린더",
      data: updatedTaskList,
    });
    EditComponentData(item);

    setEditMode(false);
    setModalOpened(false);
    setSelectedTask(null);
    setNewTitle("");
    setNewStartDate(null);
    setNewEndDate(null);
  };

  const deleteTask = () => {
    if (!selectedTask) return;

    const updatedTaskList = taskList.filter(
      (task) => task.id !== selectedTask.id
    );

    setTaskList(updatedTaskList);

    item.componentData = JSON.stringify({
      title: "Calendar",
      data: updatedTaskList,
    });
    EditComponentData(item);

    setModalOpened(false);
    setSelectedTask(null);
  };

  const handleEventClick = (task: TaskInterface) => {
    setSelectedTask(task);
    setModalOpened(true);
  };

  useEffect(() => {
    const parsedData = item.componentData ? JSON.parse(item.componentData) : {};
    const convertedTasks = (parsedData.data || []).map(
      (task: TaskInterface) => ({
        ...task,
        start: new Date(task.start),
        end: new Date(task.end),
      })
    );
    setTaskList(convertedTasks);
  }, [item.componentData]);

  return (
    <div
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
    >
      <img
        alt=""
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => DeleteComponent(item)}
        src={trash_icon}
        className={styles.icon}
      />
      <Input
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="추가할 일정 이름"
        style={{ marginBottom: "10px" }}
      />
      <div className={styles.date_input}>
        <DateInput
          valueFormat="DD/MM/YYYY HH:mm:ss"
          value={startDate}
          onChange={setStartDate}
          placeholder="시작 날짜"
          style={{ width: "250px" }}
          clearable
        />
        <DateInput
          valueFormat="DD/MM/YYYY HH:mm:ss"
          value={endDate}
          onChange={setEndDate}
          placeholder="종료 날짜"
          style={{ width: "250px" }}
          clearable
        />
        <button onClick={addTask}>추가하기</button>
      </div>

      <div style={{ height: "600px", marginTop: "20px" }}>
        <Calendar
          localizer={localizer}
          events={taskList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          onSelectEvent={(event) => handleEventClick(event)}
        />
      </div>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Task 정보"
        centered
      >
        {selectedTask && !editMode && (
          <div>
            <p>
              <strong>제목:</strong> {selectedTask.title}
            </p>
            <p>
              <strong>시작:</strong>{" "}
              {moment(selectedTask.start).format("YYYY-MM-DD HH:mm:ss")}
            </p>
            <p>
              <strong>종료:</strong>{" "}
              {moment(selectedTask.end).format("YYYY-MM-DD HH:mm:ss")}
            </p>
            <Button
              onClick={() => {
                setEditMode(true);
                setNewTitle(selectedTask.title);
                setNewStartDate(selectedTask.start);
                setNewEndDate(selectedTask.end);
              }}
            >
              수정
            </Button>
          </div>
        )}
        {selectedTask && editMode && (
          <div>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="제목을 입력"
            />
            <div className={styles.date_input}>
              <DateInput
                valueFormat="DD/MM/YYYY HH:mm:ss"
                value={newStartDate}
                onChange={setNewStartDate}
                placeholder="시작 날짜"
                style={{ width: "250px" }}
                clearable
              />
              <DateInput
                valueFormat="DD/MM/YYYY HH:mm:ss"
                value={newEndDate}
                onChange={setNewEndDate}
                placeholder="종료 날짜"
                style={{ width: "250px" }}
                clearable
              />
            </div>
            <Button onClick={editTask}>완료</Button>
          </div>
        )}
        <Button color="red" onClick={deleteTask}>
          일정 삭제
        </Button>
        <Button onClick={() => setModalOpened(false)}>닫기</Button>
      </Modal>
    </div>
  );
};

export default CalendarComponent;
