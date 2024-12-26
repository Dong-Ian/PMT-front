import React, { useState } from "react";
import { MemoComponentProps, TodoInterface } from "../type/Project.type";
import { Input } from "@mantine/core";

const TodoComponent: React.FC<MemoComponentProps> = ({
  item,
  EditComponentData,
  DeleteComponent,
}: MemoComponentProps) => {
  const [editMode, setEditMode] = useState<string | null>(null);
  const [todos, setTodos] = useState<TodoInterface[]>(
    item.componentData === "" ? [] : JSON.parse(item.componentData)
  );
  const [newTodo, setNewTodo] = useState<string>("");
  const [isEditable, setIsEditable] = useState<boolean>(false);

  async function addTodo() {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, { todo: newTodo, isComplete: false }];
      item.componentData = JSON.stringify(updatedTodos);
      EditComponentData(item);
      return updatedTodos;
    });

    setNewTodo("");
    setIsEditable(false);
  }

  function updateTodoText(index: number, newText: string) {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, todo: newText } : todo
      )
    );
  }

  function toggleComplete(index: number) {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo, i) =>
        i === index ? { ...todo, isComplete: !todo.isComplete } : todo
      );

      item.componentData = JSON.stringify(updatedTodos);
      EditComponentData(item);

      return updatedTodos;
    });
  }

  return (
    <div>
      <button
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => setIsEditable(true)}
      >
        +
      </button>
      <button
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => DeleteComponent(item)}
      >
        삭제
      </button>

      {todos.map((todo, idx) => {
        return (
          <div
            onMouseDown={(e) => e.stopPropagation()}
            key={idx}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
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

            <p
              onClick={() => toggleComplete(idx)}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              {todo.isComplete ? "[v]" : "[ ]"}
            </p>
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
        </div>
      )}
    </div>
  );
};

export default TodoComponent;
