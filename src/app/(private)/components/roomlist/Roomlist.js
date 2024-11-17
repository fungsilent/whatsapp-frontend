import { useState, useEffect } from "react";
import { useAppStore } from "#root/app/store";
import useFetch from "#root/hooks/useFetch";
import { chatlist, removeRoom } from "#root/api/friend";

function Roomlist() {
  const { user } = useAppStore();
  console.log(user);
  const [list, setList] = useState([]);

  const remove = (roomId) => {
    console.log(roomId);
    removeRoom(roomId);
  };

  useEffect(() => {
      const data = await chatlist();
      console.log(data);
      setList(data);
    };
    fetchList();
 [])

  console.log(list);
  return (
    <div className="flex flex-col gap-4 w-[400px] bg-slate-900">
      <p className="px-4 py-2 text-xl">對話</p>
      <div className="px-4">
        <input className="w-full rounded px-3 py-1 bg-slate-600 outline-none" />
      </div>
      <ul className="flex flex-col overflow-x-auto">
        {list.map((friend, index) => (
          <li
            key={index}
            className="flex gap-4 items-center px-4 py-2 hover:bg-slate-800 cursor-pointer"
          >
            <i
              className={"rounded-full w-14 h-14 aspect-square bg-slate-600"}
            />
            <div className="flex flex-wrap justify-between gap-1">
              <p className="text-lg">{friend.name}</p>
              <p className="text-sm text-slate-400">
                {friend.lastMessage ? friend.lastMessage.by : ""}{" "}
              </p>
              <p className="text-sm text-slate-400">
                {friend.lastMessage ? friend.lastMessage.content : ""}
              </p>
              <button
                className="bg-red-400 "
                onClick={() => remove(friend.roomId)}
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Roomlist;
