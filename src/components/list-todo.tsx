"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Item } from "@/models/item.model";
import ItemComp from "./item";

export default function ListTodo() {
  const [todos, setTodos] = useState<Array<Item>>([]);
  const [foundItem, setFoundItem] = useState<Array<Item>>([]);
  const [listCheckboxChecked, setListCheckboxChecked] = useState<any>([]);
  const [keySearch, setKeySearch] = useState<string>("");

  useEffect(() => {
    const handleStorage = () => {
      let todos = localStorage.getItem("todos") as string;
      setTodos(JSON.parse(todos));
    };
    handleStorage();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleDone = useCallback(() => {
    alert(`List checked: ${listCheckboxChecked}`);
    const result = todos.map((item) => {
      if (listCheckboxChecked.includes(item.title)) {
        item.status = true;
      }
      return item;
    });
    localStorage.setItem("todos", JSON.stringify(result));
    window.dispatchEvent(new Event("storage"));
  }, [listCheckboxChecked, todos]);

  const deleteTodo = useCallback(
    (title: string) => {
      let newTodos = todos.filter((item) => {
        return item.title != title;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      window.dispatchEvent(new Event("storage"));
    },
    [todos]
  );

  const handleCheckBox = useCallback(
    (title: string, checked: boolean) => {
      let listArray = [] as Array<string>;
      if (checked) {
        listArray = [...listCheckboxChecked, title];
        setListCheckboxChecked(listArray);
      }
      if (!checked) {
        const tempList = listCheckboxChecked.filter((e: string) => {
          return e !== title;
        });
        setListCheckboxChecked(tempList);
      }
    },
    [listCheckboxChecked]
  );

  const deleteMultipleItem = () => {
    const result = todos.filter(
      (item) => !listCheckboxChecked.includes(item.title)
    );
    localStorage.setItem("todos", JSON.stringify(result));
    window.dispatchEvent(new Event("storage"));
  };

  const onChange = (e: any) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = todos.filter((item) => {
        return item.title.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundItem(results);
    } else {
      setFoundItem(todos);
    }
    setKeySearch(keyword);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container pt-12 mx-auto h-screen flex flex-col justify-between border-l-2">
        <div className="pr-4 pl-4">
          <div className="flex flex-col text-center w-full mb-5">
            <h1 className="text-2xl font-medium title-font mt-2 mb-4 text-gray-900">
              Todo List
            </h1>
            <div className="relative mb-4">
              <input
                onChange={onChange}
                value={keySearch}
                type="text"
                id="title"
                name="title"
                placeholder="Search..."
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            {!todos ||
              (todos.length === 0 && (
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                  Your Todos will show up here. Please add a todo by going to
                  the homepage
                </p>
              ))}
          </div>
          <div className="flex flex-wrap overflow-scroll max-h-[70vh] w-full">
            {foundItem && foundItem.length > 0
              ? foundItem.map((item) => {
                  return (
                    <ItemComp
                      key={item.title}
                      item={item}
                      handleDelete={deleteTodo}
                      handleCheckBox={handleCheckBox}
                    />
                  );
                })
              : todos?.map((item) => {
                  return (
                    <ItemComp
                      key={item.title}
                      item={item}
                      handleDelete={deleteTodo}
                      handleCheckBox={handleCheckBox}
                    />
                  );
                })}
          </div>
        </div>

        {listCheckboxChecked.length > 0 && (
          <div className="border-2">
            <div className="h-full flex flex-row p-8">
              <div className="flex flex-row w-full">
                <div className="flex grow-[5] items-center">
                  <h2 className="title-font font-medium text-lg text-white-900">
                    Bulk Action:
                  </h2>
                </div>
                <div className="flex flex-row grow-[2] justify-between items-center">
                  <button
                    onClick={() => handleDone()}
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none w-fit hover:bg-indigo-600 rounded text-lg"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => deleteMultipleItem()}
                    className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none w-fit hover:bg-red-600 rounded text-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
