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
      <input onChange={handleChange}></input>

      <button onClick={() => search(newUsername)}> Search User </button>

      <div>
        {userlist.map((user, index) => (
          <div key={index}>
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
