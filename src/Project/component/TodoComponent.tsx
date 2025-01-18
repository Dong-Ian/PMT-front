import React, { useEffect, useState } from "react";
import { MemoComponentProps, TodosInterface } from "../type/Project.type";
import { Input, ScrollArea } from "@mantine/core";
import styles from "../style/project.module.css";

import pen_icon from "../../Utils/image/pen.png";
import check_icon from "../../Utils/image/check.png";
import trash_icon from "../../Utils/image/trash.png";
import plus_icon from "../../Utils/image/plus.png";

const TodoComponent: React.FC<MemoComponentProps> = ({
  item,
  EditComponentData,
  DeleteComponent,
}: MemoComponentProps) => {
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editTodoeMode, setEditTodoMode] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodosInterface>(
    item.componentData === ""
      ? { title: "할 일 목록", todos: [] }
      : JSON.parse(item.componentData)
  );
  const [newTodo, setNewTodo] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const addTodo = () => {
    setTodos((prevTodos) => {
      const updatedTodos = {
        ...prevTodos,
        todos: [...prevTodos.todos, { todo: newTodo, isComplete: false }],
      };
      item.componentData = JSON.stringify(updatedTodos);
      EditComponentData(item);
      return updatedTodos;
    });

    setNewTodo("");
    setIsEditable(false);
  };

  const deleteTodo = (idx: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = {
        ...prevTodos,
        todos: prevTodos.todos.filter((_, index) => index !== idx),
      };
      item.componentData = JSON.stringify(updatedTodos);
      EditComponentData(item);
      return updatedTodos;
    });
  };

  const updateTodoText = (index: number, newText: string) => {
    setTodos((prevTodos) => {
      const updatedTodos = {
        ...prevTodos,
        todos: prevTodos.todos.map((todo, i) =>
          i === index ? { ...todo, todo: newText } : todo
        ),
      };
      item.componentData = JSON.stringify(updatedTodos);
      EditComponentData(item);
      return updatedTodos;
    });
  };

  const toggleComplete = (index: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = {
        ...prevTodos,
        todos: prevTodos.todos.map((todo, i) =>
          i === index ? { ...todo, isComplete: !todo.isComplete } : todo
        ),
      };
      item.componentData = JSON.stringify(updatedTodos);
      EditComponentData(item);
      return updatedTodos;
    });
  };

  const editTitle = () => {
    const updatedData = JSON.stringify({
      title: title,
      todos: todos.todos,
    });

    item.componentData = updatedData;
    EditComponentData(item);
    setEditMode(null);
  };

  useEffect(() => {
    const parsedData = item.componentData
      ? JSON.parse(item.componentData)
      : { title: "", todos: [] };

    setTitle(parsedData.title || "");
    setTodos(parsedData);
  }, [item.componentData]);

  return (
    <>
      <img
        src={plus_icon}
        alt=""
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => setIsEditable(true)}
        className={styles.icon}
      />
      {editTodoeMode ? (
        <img
          alt=""
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => {
            setEditTodoMode(false);
            editTitle();
          }}
          src={check_icon}
          className={styles.icon}
        />
      ) : (
        <img
          alt=""
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => setEditTodoMode(true)}
          src={pen_icon}
          className={styles.icon}
        />
      )}
      <img
        alt=""
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => DeleteComponent(item)}
        src={trash_icon}
        className={styles.icon}
      />
      <ScrollArea h={"calc(100% - 30px)"}>
        {editTodoeMode ? (
          <Input
            onMouseDown={(e) => e.stopPropagation()}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        ) : (
          <p
            className={styles.todo_title}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {todos.title}
          </p>
        )}

        {todos.todos.map((todo, idx) => {
          return (
            <div
              onMouseDown={(e) => e.stopPropagation()}
              key={idx}
              className={styles.todo_list}
            >
              <p
                onClick={() => toggleComplete(idx)}
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  whiteSpace: "pre",
                }}
              >
                {todo.isComplete ? "[v]" : "[  ]"}
              </p>
              <p
                onClick={() => {
                  if (editMode === `${idx}-todo`) {
                    setEditMode(null);
                  } else {
                    setEditMode(`${idx}-todo`);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                {editMode === `${idx}-todo` ? (
                  <input
                    type="text"
                    value={todo.todo}
                    onChange={(e) => updateTodoText(idx, e.target.value)}
                    onBlur={() => setEditMode(null)}
                    autoFocus
                  />
                ) : (
                  todo.todo
                )}
              </p>
              {editTodoeMode && (
                <button onClick={() => deleteTodo(idx)}>x</button>
              )}
            </div>
          );
        })}

        {isEditable && (
          <div onMouseDown={(e) => e.stopPropagation()}>
            <Input
              value={newTodo}
              onChange={(event) => setNewTodo(event.target.value)}
              placeholder="할 일을 입력하세요"
            />
            <button onClick={addTodo}>추가</button>
            <button onClick={() => setIsEditable(false)}>취소</button>
          </div>
        )}
      </ScrollArea>
    </>
  );
};

export default TodoComponent;
