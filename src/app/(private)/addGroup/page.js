"use client";
import { createGroup, addMember, deleteMember } from "#root/api/group";

const Group = () => {
  return (
    <>
      <div> add group</div>
      <input></input>
      <button>Group add</button>

      <div className="mt-5">member</div>
      <input></input>
      <button>member add</button>
    </>
  );
};

export default Group;
