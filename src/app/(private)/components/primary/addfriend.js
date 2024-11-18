"use client";
import { addFriend, searchUser } from "#root/api/friend";
import useFetch from "#root/hooks/useFetch";
import { useState } from "react";

function NewFriend() {
  const [userlist, setUserlist] = useState([]);
  const [dispatchAdd, user, isLoading, error] = useFetch();
  const [newUsername, setNewUsername] = useState("");

  const handleChange = (event) => {
    setNewUsername(event.target.value);
    console.log(newUsername);
  };

  const search = async (newUsername) => {
    const data = await searchUser(newUsername);
    setUserlist(data.data);
  };

  const add = async (username) => {
    dispatchAdd(() => addFriend({ username }));
    console.log(username, " added");
  };

  console.log(userlist);
  return (
    <div>
      <p className="py-2 px-4 text-2xl">Search</p>
      <div>
        <div className="flex content-center ml-4 ">
          <input
            className="w-75% rounded px-3 py-1 bg-stone-200 dark:bg-slate-600 placeholder-gray-400 outline-none',"
            onChange={handleChange}
          ></input>
          {isLoading && <div>{isLoading}</div>}
          {error && <div>{error}</div>}
          <button onClick={() => search(newUsername)}>
            {" "}
            <svg
              className="w-8 h-8 text-gray-800 dark:text-white"
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
                strokeWidth="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="ml-4">
        {userlist.map((user, index) => (
          <div className="flex flex-col my-4" key={index}>
            <div>name:{user.name}</div>
            <div>username:{user.username}</div>
            <div className="cursor-pointer" onClick={() => add(user.username)}>
              Add
            </div>
          </div>
        ))}
        <div>{error ? error : ""} </div>
      </div>
    </div>
  );
}

export default NewFriend;
