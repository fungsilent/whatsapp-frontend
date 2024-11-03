'use client'
import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import useFetch from '#root/hooks/useFetch'
import { signin } from '#root/api/user'
import { useAppStore } from '#root/app/store'

const LoginPage = () => {
    const { setUser } = useAppStore()
    const [dispatchSignin, user, isLoading, error] = useFetch()
    const [{ username, password }, setForm] = useState({
        username: '',
        password: '',
    })

    useEffect(() => {
        if (user) {
            setUser(user)
            redirect('/')
        }
    }, [user])

    const doLogin = () => {
        dispatchSignin(() => signin({ username, password }))
    }

    const setFormValue = event => {
        event.target.value
        setForm(state => ({
            ...state,
            [event.target.name]: event.target.value,
        }))
    }

    return (
        <form className='p-10'>
            <div>
                <label>Username</label>
                <input
                    name='username'
                    type='text'
                    value={username}
                    onChange={setFormValue}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    name='password'
                    type='password'
                    value={password}
                    onChange={setFormValue}
                />
            </div>
            {isLoading && <div>isLoading</div>}
            <button
                type='button'
                onClick={doLogin}
            >
                Login
            </button>
        </form>
    )
}

export default LoginPage
