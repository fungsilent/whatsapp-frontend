"use client"
import { addFriend, searchUser } from "#root/api/friend"
import useFetch from "#root/hooks/useFetch"
import { useState } from "react"

function NewFriend() {
    const [userlist, setUserlist] = useState([])
    const [dispatchAdd, user, isLoading, error] = useFetch()
    const [newUsername, setNewUsername] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (event) => {
        setNewUsername(event.target.value)
        setErrorMessage("") // Clear error message when typing
    }

    const search = async (username) => {
        const data = await searchUser(username)
        if (data.data && data.data.length > 0) {
            setUserlist(data.data)
            setErrorMessage("") // Clear any previous error message
        } else {
            setUserlist([])
            setErrorMessage("Username not found")
        }
    }

    const add = async (username) => {
        dispatchAdd(() => addFriend({ username }))
        console.log(username, " added")
    }

    return (
        <div className="bg-sky-50 dark:bg-slate-800 my-4">
            <div className="border-b-2">
                <input
                    onChange={handleChange}
                    className="mr-10 rounded-sm mb-6"
                ></input>
                <button
                    onClick={() => search(newUsername)}
                    className="w-50% text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    {" "}
                    Search User{" "}
                </button>
            </div>
            
            <div>
                {userlist.map((user, index) => (
                    <div key={index} className="border-solid border-2 p-2 my-2 border-slate-500">
                        <div>
                            <div>name: {user.name}</div>
                            <div>username: {user.username}</div>
                        </div>

                        <div
                            className="cursor-pointer dark:bg-slate-500 dark:text-white p-1 font-bold"
                            onClick={() => add(user.username)}
                        >
                            Add
                        </div>
                    </div>
                ))}
                <div>
                    {errorMessage && (
                        <span style={{ color: "red" }}>{errorMessage}</span>
                    )}
                </div>
                <div>{error ? error : ""} </div>
            </div>
        </div>
    )
}

export default NewFriend
