"use client";
import { redirect } from "next/navigation";

import Modal from "react-modal";
import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "black",
  },
};

Modal.setAppElement("body");

function Popup() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function logOut() {
    localStorage.removeItem("token");
    redirect("/login");
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div className="">
          <h2 className=" p-6 rounded shadow-md">Do you confirm to log out</h2>
          <button onClick={closeModal} className="">
            close
          </button>
          <button
            type="button"
            className="focus:outline-none text-black bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={logOut}
          >
            Log out
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Popup;
