"use client"
import { useState, useEffect } from "react"
import { redirect } from "next/navigation"
import useFetch from "#root/hooks/useFetch"
import { signin } from "#root/api/user"
import { useAppStore } from "#root/app/store"
import Link from "next/link"

const LoginPage = () => {
    const { setUser } = useAppStore()
    const [dispatchSignin, user, isLoading, error] = useFetch()
    const [{ username, password }, setForm] = useState({
        username: "",
        password: "",
    })

    useEffect(() => {
        if (user) {
            setUser(user)
            redirect("/")
        }
    }, [user])

    const doLogin = () => {
        dispatchSignin(() => signin({ username, password }))
    }

    const setFormValue = (event) => {
        event.target.value
        setForm((state) => ({
            ...state,
            [event.target.name]: event.target.value,
        }))
    }

    return (
        <form className="p-10">
            <div>
                <label className="mr-2">
                    <p>Username</p>
                    <input
                        name="username"
                        type="text"
                        value={username}
                        onChange={setFormValue}
                    />
                </label>
            </div>
            <div className="mt-2">
                <label className="mr-2">Password</label>
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={setFormValue}
                />
            </div>
            {isLoading && <div>isLoading</div>}
            <button
                type="button"
                onClick={doLogin}
                className="bg-white rounded-sm text-black font-bold p-1.5 mt-3"
            >
                Login
            </button>
            <p className="mt-5">No account yet?</p>
            <button
                type="button"
                onClick={doLogin}
                className="bg-white rounded-sm text-black font-bold p-1.5 mt-1"
            >
                <Link href={"/signup"}>Sign Up</Link>
            </button>
        </form>
    )
}

export default LoginPage
