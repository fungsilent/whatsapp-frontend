"use client";
import { useState } from "react";
import { createGroup } from "#root/api/chat";
import useFetch from "#root/hooks/useFetch";
import { Spinner } from "flowbite-react";

const NewGroup = () => {
  const [newGroup, setNewGroup] = useState("");
  const [dispatchAdd, group, isLoading, error] = useFetch();

  const create = (newGroup) => {
    dispatchAdd(() => createGroup(newGroup));
    console.log(newGroup);
  };

  const handleChange = (event) => {
    setNewGroup(event.target.value);
  };

  return (
    <div className="h-full flex flex-col gap-3 bg-white dark:bg-slate-900 border-r-[1px] border-stone-300 dark:border-slate-700 overflow-y-auto">
      <div className="py-2 px-4 text-2xl "> Create new group</div>
      <div className="flex content-center m-4  mt-0 border-b-2 pb-4">
        <input
          className="w-75% rounded px-3 py-1 bg-stone-200 dark:bg-slate-600 placeholder-gray-400 outline-none',"
          onChange={handleChange}
          placeholder="Insert group name"
        ></input>
        <div className="cursor-pointer " onClick={() => create(newGroup)}>
          <svg
            className="w-8 h-8 ml-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14m-7 7V5"
            />
          </svg>
        </div>
      </div>

      {isLoading && <Spinner />}
      <div>{error ? error : ""} </div>
    </div>
  );
};

export default NewGroup;
