import { useState } from "react"
import { useAppStore } from "#root/app/store"
import { updateUserInfo } from "#root/api/user"
import useFetch from "#root/hooks/useFetch"

const Profile = () => {
    const { user, setUser } = useAppStore()
    const [form, setForm] = useState({
        name: user.name,
    })
    const [dispatchUpdate, isLoading, error] = useFetch()

    // useFetch()
    console.log(form)

    const doUpdate = () => {
        console.log("work!")
        dispatchUpdate(() => updateUserInfo(form))
    }

    const setFormValue = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <>
            <div className="text-slate-800 bg-sky-50 dark:bg-slate-800 dark:text-white">
                Profile
            </div>

            <p className="text-slate-800 bg-sky-50 dark:bg-slate-800 dark:text-white">
                Username: {user.username}
            </p>

            <p>Icon</p>
            <p>Display Name: </p>
            <input name="name" value={form.name} onChange={setFormValue} />

            <p>Update Password:</p>
            <input
                placeholder="********"
                value={form.password}
                onChange={setFormValue}
            />
            <div className="mt-5">
                <button
                    type="button"
                    className="w-50% text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={doUpdate}
                >
                    Update
                </button>
            </div>
        </>
    )
}

export default Profile
