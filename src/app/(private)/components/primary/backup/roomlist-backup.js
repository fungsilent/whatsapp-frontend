import { useState, useEffect } from "react";
import { Avatar, Spinner } from "flowbite-react";
import TextField, { useText } from "#root/components/TextField";
import Name from "#root/components/Name";
import useFetch from "#root/hooks/useFetch";
import { fetchFriends, removeFriend } from "#root/api/friend";
import { useAppStore } from "#root/app/store";
import Delete from "./deleteConfrim";
import { userAgent } from "next/server";

const FriendList = () => {
  const [search, setSearch, debounceSearch] = useText("", 300);
  const [list, setList] = useState([]);
  const [dispatchFriend, friends, isLoading, error] = useFetch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteDisplay, setDeleteDisplay] = useState(false);
  const [deletedRoom, setDeletedRoom] = useState("");

  console.log(friends);

  useEffect(() => {
    dispatchFriend(fetchFriends);
  }, []);

  useEffect(() => {
    if (!friends) return;
    setList(friends);
  }, [friends]);

  useEffect(() => {
    if (!friends) return;
    const result = friends.filter((friend) =>
      friend.name.includes(debounceSearch)
    );
    setList(result);
  }, [debounceSearch]);

  const handleDelete = () => {
    removeFriend(deletedRoom);
  };

  const showDelete = () => {
    if (!deleteDisplay) {
      setDeleteDisplay(true);
    } else {
      setDeleteDisplay(false);
    }
    console.log(deleteDisplay);
  };

  return (
    <div className="h-full flex flex-col gap-3 bg-white dark:bg-slate-900 border-r-[1px] border-stone-300 dark:border-slate-700 overflow-y-auto">
      <div className="flex  ">
        <p className=" py-2 px-4 text-2xl">
          <span className="flex items-center h-12">Chats</span>
        </p>
        <div
          className="ml-auto my-auto cursor-pointer"
          onClick={() => showDelete()}
        >
          <svg
            className="ml-auto my-auto mr-3 w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="px-4">
        <TextField
          placeholder="Search"
          value={search}
          onChange={(value) => setSearch(value)}
        />
      </div>
      {isLoading && <Spinner />}
      {list && (
        <ul className="flex flex-col overflow-y-auto">
          {list.map((friend, index) => (
            <Friend
              key={index}
              {...friend}
              deleteDisplay={deleteDisplay}
              setModalOpen={setModalOpen}
              setDeletedRoom={setDeletedRoom}
            />
          ))}
        </ul>
      )}
      <Delete
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

const Friend = ({
  roomId,
  name,
  lastMessage,
  deleteDisplay,
  setModalOpen,
  setDeletedRoom,
}) => {
  const { setRoom } = useAppStore();

  const onClick = () => {
    setRoom(roomId);
  };

  const deleteRoom = () => {
    setModalOpen(true);
    setDeletedRoom(roomId);
  };

  return (
    <li
      className="flex hover:bg-slate-100 hover:dark:bg-slate-700 cursor-pointer"
      onClick={onClick}
    >
      <Avatar rounded size="md" className="px-4" />
      <div className="flex-1 border-b-2 border-b-stone-200 dark:border-b-slate-800 pr-4 py-2">
        <div className="flex-1 grid grid-rows-2 grid-cols-[1fr_auto] gap-y-2 gap-4">
          <Name type="name">{name}</Name>

          <span className="text-sm text-slate-400">24:00</span>
          <span className="text-slate-300">
            {"by"}
            {" : "}
            {"eqweqw"}
          </span>
        </div>
      </div>
      {deleteDisplay && (
        <div
          onClick={() => deleteRoom()}
          className=" flex bg-red-700 w-16 hover:bg-red-400 border-b-stone-200"
        >
          <svg
            className="w-8 h-8 m-auto text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </li>
  );
};

export default FriendList;
