"use client";
import { addFriend, searchUser } from "#root/api/chat";
import useFetch from "#root/hooks/useFetch";
import { useState, useEffect } from "react";
import Name from "#root/components/Name";
import clsx from "clsx";
import { Avatar, Spinner, Popover, Modal } from "flowbite-react";
import TextField, { useText } from "#root/components/TextField";

function NewFriend() {
  const [search, setSearch, debounceSearch] = useText("", 300);
  const [dispatchSearch, users, isLoading, error] = useFetch();

  useEffect(() => {
    if (debounceSearch) {
      dispatchSearch(() => searchUser(debounceSearch));
    }
  }, [debounceSearch]);

  console.log(users);
  return (
    <div className="h-full flex flex-col gap-3 bg-white dark:bg-slate-900 border-r-[1px] border-stone-300 dark:border-slate-700 overflow-y-auto">
      <p className="py-2 px-4 text-2xl">Search friend</p>
      <div className="flex content-center m-4  mt-0 border-b-2 pb-4">
        <div className="flex content-center  ">
          <TextField
            placeholder="Insert friend username"
            value={search}
            onChange={(value) => setSearch(value)}
          />
        </div>
      </div>
      <div>
        {debounceSearch && !isLoading && !users?.length && (
          <p className="py-6 text-sm text-center">No user found</p>
        )}

        {debounceSearch &&
          !isLoading &&
          !!users?.length &&
          users.map((user, index) => (
            <Addfriend key={user.username} user={user} />
          ))}
      </div>
    </div>
  );
}

const Addfriend = ({ user, index }) => {
  const [dispatchAdd, isAdd, isLoading, error] = useFetch();

  const add = async (username) => {
    dispatchAdd(() => addFriend({ username }));
    console.log(username, " added");
  };

  return (
    <div
      className="flex flex-col  border-b-2 p-2 mx-2 flex-1  hover:bg-slate-100 hover:dark:bg-slate-700 "
      key={index}
    >
      <div className="flex ">
        <div>
          <Avatar rounded size="md" className="px-4" />
        </div>
        <div className="flex flex-col">
          <Name type="name">{user.name}</Name>
          <Name type="username">{user.username}</Name>
        </div>
        <div className=" m-auto mr-2">
          <span className=" text-xs">
            {isLoading && <Spinner />}
            {!isLoading && !error && (
              <svg
                onClick={() => add(user.username)}
                className={clsx(
                  "w-6 h-6 cursor-pointer",
                  { "text-gray-500 dark:text-white": !isAdd },
                  { "text-emerald-600": isAdd }
                )}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {error && (
              <Popover
                trigger="hover"
                placement="left"
                content={<p className="py-1 px-2">{error}</p>}
              >
                <svg
                  className="w-6 h-6 text-rose-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Popover>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewFriend;
