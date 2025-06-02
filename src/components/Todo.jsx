import React, { useState, useRef, useEffect } from "react";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [todoList, SetTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  //update localstorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const inputRef = useRef();

  //add new task

  const addTask = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    SetTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  //update task status

  const toggleTask = (id) => {
    SetTodoList((prev) => {
      return prev.map((todo) => {
        if (id === todo.id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  //delete todo item
  const deleteTodo = (id) => {
    SetTodoList((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };

  return (
    <>
      <div className="w-[30-rem]">
        <h1 className="my-2 text-lg font-medium text-amber-500">To-Do-list</h1>
        <div className="flex gap-2">
          <div>
            <input
              ref={inputRef}
              type="text"
              className="w-full px-4 py-3 text-sm border focus:outline-none focus:border-blue-400"
              placeholder="Add your task"
            />
          </div>
          <button
            className="px-4 py-3 text-sm font-medium text-white bg-blue-600 border-none rounded-sm hover:border-none"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <p className="px-1 my-3 text-sm text-zinc-400">Fill task details</p>
      </div>
      <div className="w-[30-rem] bg-white shadow py-6 px-4">
        <fieldset className="space-y-3">
          <legend className="font-medium text-pink-600">List of tasks</legend>
          {/* list Items start */}
          {todoList.length === 0 ? (
            <p className="text-sm text-gray-500">No tasks found</p>
          ) : (
            todoList.map((todo, index) => {
              return (
                <TodoItem
                  text={todo.text}
                  key={index}
                  isComplete={todo.isComplete}
                  id={todo.id}
                  toggleTask={toggleTask}
                  deleteTodo={deleteTodo}
                />
              );
            })
          )}

          {/* list Items end */}
        </fieldset>
      </div>
    </>
  );
};

export default TodoItem;
