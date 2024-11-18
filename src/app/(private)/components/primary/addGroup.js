"use client";
import { useState } from "react";
import { createGroup, addMember, deleteMember } from "#root/api/group";
import useFetch from "#root/hooks/useFetch";

const NewGroup = () => {
  const [newGroup, setNewGroup] = useState("");
  const [dispatchAdd, group, isLoading, error] = useFetch();

  const create = (newGroup) => {
    dispatchAdd(createGroup(newGroup));
    console.log(newGroup);
  };

  const handleChange = (event) => {
    setNewGroup(event.target.value);
  };

  return (
    <>
      <div className="py-2 px-4 text-2xl"> Create Group</div>
      <div className="flex content-center ml-4">
        <input
          className="w-75% rounded px-3 py-1 bg-stone-200 dark:bg-slate-600 placeholder-gray-400 outline-none',"
          onChange={handleChange}
        ></input>
        <button onClick={() => create(newGroup)}>Group add</button>
      </div>
      {/* <div className="mt-5">member</div>
      <input></input>
      <button>member add</button> */}
      <div>{error ? error : ""} </div>
    </>
  );
};

export default NewGroup;
