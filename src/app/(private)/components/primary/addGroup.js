"use client";
import { useState } from "react";
import { createGroup, addMember, deleteMember } from "#root/api/group";

const NewGroup = () => {
  const [newGroup, setNewGroup] = useState("");

  const create = (newGroup) => {
    createGroup(newGroup);
    console.log(newGroup);
  };

  const handleChange = (event) => {
    setNewGroup(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <div> add group</div>
      <input onChange={handleChange}></input>
      <button onClick={() => create(newGroup)}>Group add</button>

      {/* <div className="mt-5">member</div>
      <input></input>
      <button>member add</button> */}
      <div>{error ? error : ""} </div>
    </>
  );
};

export default NewGroup;
