"use client";
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { Inter } from "next/font/google";
import { useCallback, useState } from "react";
import { Item } from "@/models/item.model";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  item?: Item;
}

export default function AddTodoList(props: Props) {
  const { item } = props;
  const [todo, setTodo] = useState<Item>(
    item || {
      title: "",
      description: "",
      date: "",
      priority: "",
      status: false,
    }
  );

  const addTodo = useCallback(() => {
    let todos = localStorage.getItem("todos");
    if (!todo.title) {
      return;
    }
    if (todos) {
      let todosJson = JSON.parse(todos);
      if (
        todosJson.filter((value: any) => {
          return value.title === todo.title;
        }).length > 0
      ) {
        alert("Todo with this title already exists");
        return;
      } else {
        todosJson.push(todo);
        localStorage.setItem("todos", JSON.stringify(todosJson));
        alert("Todo has been added");
        setTodo({
          title: "",
          description: "",
          date: "",
          priority: "",
          status: false,
        });
      }
    } else {
      localStorage.setItem("todos", JSON.stringify([todo]));
    }
    window.dispatchEvent(new Event("storage"));
  }, [todo]);

  const editTodo = useCallback(() => {
    let todos = localStorage.getItem("todos") as string;
    let todosJson = JSON.parse(todos);
    if (!todo.title) {
      return;
    }
    const tempTodos = todosJson.filter((value: any) => {
      return value.title !== item?.title;
    });
    setTimeout(() => {
      tempTodos.push(todo);
      localStorage.setItem("todos", JSON.stringify(tempTodos));
      alert("Todo has been edited");
      window.dispatchEvent(new Event("storage"));
    });
  }, [item?.title, todo]);

  const onChange = (e: any) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };
  return (
    <div className="my-2 text-3xl">
      <section className="text-gray-600 body-font">
        <div className="">
          <div className="rounded-lg pl-8 pr-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            {!item && (
              <h2 className="text-2xl font-medium title-font mb-4 text-gray-900 text-center">
                New Task
              </h2>
            )}
            <div className="relative mb-4">
              <input
                onChange={onChange}
                value={todo.title}
                type="text"
                id="title"
                name="title"
                placeholder="Add new task ..."
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">
                Description
              </label>
              <textarea
                onChange={onChange}
                value={todo.description}
                id="description"
                name="description"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative mb-4">
              <div className="flex flex-row justify-between">
                <div className="w-5/12">
                  <label className="leading-7 text-sm text-gray-600">
                    Due Date
                  </label>
                  <input
                    onChange={onChange}
                    value={todo.date}
                    type="date"
                    id="date"
                    name="date"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="w-5/12">
                  <label className="leading-7 text-sm text-gray-600">
                    Todo Text
                  </label>
                  <select
                    onChange={onChange}
                    value={todo.priority}
                    id="priority"
                    name="priority"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out h-11"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              onClick={item ? editTodo : addTodo}
              className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none w-fit hover:bg-green-600 rounded text-lg w-full"
            >
              {!item ? "Add" : "Update"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
