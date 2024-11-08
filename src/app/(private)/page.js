"use client";
import classNames from "classnames";
import ChatSection from "./components/chat/Section";

import { useRouter } from "next/navigation";
import ReactModal from "react-modal";
import Popup from "#root/components/popup";

const HomePage = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] p-6">
      <div className="flex h-full w-full">
        <ul className="flex flex-col gap-4 p-4 bg-slate-800">
          <Popup />
          <li className="rounded-full w-10 aspect-square bg-slate-600 cursor-pointer mt-auto"></li>
        </ul>
        <div className="flex flex-col gap-4 w-[400px] bg-slate-900">
          <p className="px-4 py-2 text-xl">對話</p>
          <div className="px-4">
            <input className="w-full rounded px-3 py-1 bg-slate-600 outline-none" />
          </div>
          <ul className="flex flex-col overflow-x-auto">
            {[...Array(20)].map((item, index) => (
              <li
                key={index}
                className="flex gap-4 items-center px-4 py-2 hover:bg-slate-800 cursor-pointer"
              >
                <i
                  className={
                    "rounded-full w-14 h-14 aspect-square bg-slate-600"
                  }
                />
                <div className="flex flex-wrap justify-between gap-1">
                  <p className="text-lg">+852 6543 7890</p>
                  <p className="text-sm text-slate-400">2/11/2024</p>
                  <p className="text-sm text-slate-400">~ Lam: 我有野想問</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <ChatSection />
      </div>
    </div>
  );
};

export default HomePage;
