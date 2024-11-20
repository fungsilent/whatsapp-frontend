import { Avatar } from "flowbite-react";
import clsx from "clsx";

const Icon = ({ name, type }) => {
  const backgroundColor = clsx({
    "bg-indigo-500	": type === "friend",
    "bg-fuchsia-500	": type === "group",
    "bg-gray-100": type === "default",
  });
  return (
    <div className="px-4 m-auto">
      <div
        className={`inline-flex items-center justify-center w-10 h-10  overflow-hidden rounded-full ${backgroundColor}`}
      >
        <span className="font-extrabold text-gray-300 text-xl ">{name[0]}</span>
      </div>
    </div>
  );
};

export default Icon;
