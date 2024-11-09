"use client"

import useFetch from "#root/hooks/useFetch"
import axiosBackend from "#root/utils/axios"
import Link from "next/link"

const Signup = () => {
    const [dispatchSignup, user, isLoading, error] = useFetch()

    const doSignup = () => {
        const signingup = async ({ username, password }) => {
            const res = await axiosBackend.post("/user/login", {
                username,
                password,
            })
            if (!res.ok) {
                return res
                const token = generateToken({ id: newUser._id })
                res.sendSuccess({ token })
            }
            const { token, ...user } = res.data
            localStorage.setItem("token", token)
            return {
                ...res,
                data: user,
            }
        }
        dispatchSignup(() => signingup({ username, password }))
    }

    // 如果撞名彈警告
    const matchUsername = (e) => {
        console.log(e.target.value)
    }

    const matchPassword = () => {
        // password 同 re-enter 要一樣
    }

    return (
        <>
            <div className="p-2">
                {/* insert icon??? or default icon */}
                {/* <image
                    alt=""
                    className="rounded-full w-14 h-14 aspect-square bg-slate-600"
                /> */}
                <label>
                    {/* check username 同 db 有冇已存在/相同 */}
                    {/* Max 10 characters? */}
                    <p> Please enter your username:</p>
                    <input
                        name="username"
                        type="text"
                        onChange={matchUsername}
                        minLength={4}
                        maxLength={10}
                        required
                    ></input>
                </label>
                <label>
                    <p>Please enter your password:</p>
                    <input
                        name="password"
                        type="password"
                        onChange={matchPassword()}
                    ></input>
                </label>
                {/* <label> */}
                {/* 行個Logic 同上面密碼對係咪一樣 */}
                {/* <p>Please re-confirm your password:</p> */}
                {/* <input></input> */}
                {/* </label> */}
                <div className="mt-5">
                    <Link
                        href="/"
                        className="bg-white rounded-sm text-black font-bold px-2 py-1 mt-1 mr-2"
                    >
                        Back
                    </Link>
                    <button
                        onClick={doSignup}
                        className="bg-white rounded-sm text-black font-bold px-2 py-1mt-1"
                    >
                        Sign Up!
                    </button>
                </div>
            </div>
        </>
    )
}

export default Signup
