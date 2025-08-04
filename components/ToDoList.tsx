"use client";
import { type ChangeEvent, useCallback, useEffect, useReducer, useState } from "react";

import ToDoListReducer, { initialState } from "@/reducers/toDoListReducer";
import { Check, CheckCheck, X } from "lucide-react";

const ToDoList = () => {
  const [newTask, setNewTask] = useState<string>("");
  const [{ tasks }, toDoListdispatch] = useReducer(ToDoListReducer, initialState);

  const handleNewTaskChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  }, []);

  const handleAddTaskClick = useCallback(() => {
    if (!newTask.trim()) return;
    toDoListdispatch({ type: "add", payload: newTask });
    setNewTask("");
  }, [newTask]);

  const handleResetToDoListClick = useCallback(() => {
    toDoListdispatch({ type: "reset" });
    setNewTask("");
  }, []);

  const handleCompleteTaskClick = useCallback((taskId: string) => {
    toDoListdispatch({ type: "toggle", payload: taskId });
  }, []);

  const handleDeleteTaskClick = useCallback((taskId: string) => {
    toDoListdispatch({ type: "delete", payload: taskId });
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {tasks.map(({ id, text, completed }) => (
          <div
            key={id}
            aria-checked={completed}
            className="relative max-w-xs min-w-[200px] rounded-md border-2 border-amber-300 p-4 pt-6 text-center break-normal aria-checked:border-green-500"
          >
            <div className="absolute top-0 right-0">
              <button
                aria-label="Complete"
                aria-checked={completed}
                onClick={() => handleCompleteTaskClick(id)}
                className="rounded-full p-1 text-amber-300 transition hover:bg-white/10 aria-checked:text-green-500"
              >
                {completed ? <CheckCheck size={16} /> : <Check size={16} />}
              </button>
              <button
                aria-label="Delete"
                onClick={() => handleDeleteTaskClick(id)}
                className="rounded-full p-1 transition hover:bg-white/10"
              >
                <X size={16} />
              </button>
            </div>
            {text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex w-fit flex-col gap-2">
        <label htmlFor="addTask">Add new to do task:</label>
        <input
          id="addTask"
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTaskClick();
            }
          }}
          className="rounded-sm bg-zinc-800 p-1"
        />
        <div className="flex justify-between">
          <button
            onClick={handleAddTaskClick}
            className="rounded-sm border border-zinc-400 bg-zinc-800 px-3 py-1 hover:bg-zinc-700"
          >
            Add
          </button>
          <button
            onClick={handleResetToDoListClick}
            className="rounded-sm border border-zinc-400 bg-zinc-800 px-3 py-1 hover:bg-zinc-700"
          >
            Reset To Do List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
