import AddTodoList from "@/components/add-todo-list";
import ListTodo from "@/components/list-todo";
import Image from "next/image";
import "./globals.css";

export default function Home() {
  return (
    <>
      <div className="flex lg:flex-row min-[320px]:flex-col justify-between ">
        <div className="w-6/12 min-[320px]:w-full px-5 py-12">
          <AddTodoList />
        </div>
        <div className="w-6/12 min-[320px]:w-full">
          <ListTodo />
        </div>
      </div>
    </>
  );
}
