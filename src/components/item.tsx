"use client";
import React, { useEffect, useState } from "react";
import { Item } from "@/models/item.model";
import AddTodoList from "./add-todo-list";
import cx from "classnames";

interface Props {
  item: Item;
  handleDelete: (title: string) => void;
  handleCheckBox: (title: string, isChecked: boolean) => void;
}

export default function ItemComp(props: Props) {
  const { item, handleDelete, handleCheckBox } = props;
  const [checked, setChecked] = useState(false);
  const [isDetail, setIsDetail] = useState(false);

  const handleChange = (e: boolean) => {
    handleCheckBox(item.title, e);
    setChecked(!checked);
  };

  const handleDetail = () => {
    setIsDetail(!isDetail);
  };

  return (
    <div
      key={item.title}
      className={cx("p-4 w-full border-2 mb-1", {
        ["bg-gray-500"]: item.status,
      })}
    >
      <div className="h-full flex flex-col ">
        <div className="h-full flex flex-row ">
          <div className="flex flex-row w-full">
            <div className="flex grow-[1] ">
              <input
                type="checkbox"
                onChange={(e) => handleChange(e.target.checked)}
              />
            </div>
            <div className="flex grow-[3] max-w-[200px] items-center">
              <h2 className="title-font font-medium text-lg text-white-900">
                {item.title}
              </h2>
            </div>
            <div className="flex flex-row grow-[1] justify-between items-center">
              <button
                onClick={() => handleDetail()}
                className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none w-fit hover:bg-green-600 rounded text-lg"
              >
                Detail
              </button>
              <button
                onClick={() => handleDelete(item.title)}
                className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none w-fit hover:bg-red-600 rounded text-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        {isDetail && <AddTodoList item={item} />}
      </div>
    </div>
  );
}
