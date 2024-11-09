'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useFetch from '#root/hooks/useFetch'
import { signup } from '#root/api/user'
import Link from 'next/link'

const Signup = () => {
    const router = useRouter()
    const [form, setForm] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
    })
    const [formError, setFormError] = useState('')
    const [dispatchSignup, data, isLoading, error] = useFetch({
        log: 'signup',
    })

    useEffect(() => {
        if (data) {
            router.push('/')
        }
    }, [data])

    const doSignup = () => {
        if (form.password !== form.confirmPassword) {
            return setFormError('Confirm password incorrect')
        }
        dispatchSignup(() => signup(form))
    }

    // 如果撞名彈警告
    const onFormChange = e => {
        const name = e.target.name
        let value = e.target.value
        if (name === 'confirmPassword') {
            setFormError('')
        }
        if (name === 'username') {
            value = value.toLowerCase()
        }
        setForm({
            ...form,
            [name]: value,
        })
    }

    return (
        <>
            <div className='p-2'>
                {/* insert icon??? or default icon */}
                {/* <image
                    alt=""
                    className="rounded-full w-14 h-14 aspect-square bg-slate-600"
                /> */}
                <label>
                    <p> Please enter your display name:</p>
                    <input
                        name='name'
                        type='text'
                        value={form.name}
                        onChange={onFormChange}
                        minLength={4}
                        maxLength={10}
                        required
                    ></input>
                </label>
                <label>
                    {/* check username 同 db 有冇已存在/相同 */}
                    {/* Max 10 characters? */}
                    <p> Please enter your username:</p>
                    <input
                        name='username'
                        type='text'
                        value={form.username}
                        onChange={onFormChange}
                        minLength={4}
                        maxLength={10}
                        required
                    ></input>
                </label>
                <label>
                    <p>Please enter your password:</p>
                    <input
                        name='password'
                        type='password'
                        value={form.password}
                        onChange={onFormChange}
                    ></input>
                </label>
                <label>
                    <p>Please enter your password:</p>
                    <input
                        name='confirmPassword'
                        type='password'
                        value={form.confirmPassword}
                        onChange={onFormChange}
                    ></input>
                </label>
                {/* <label> */}
                {/* 行個Logic 同上面密碼對係咪一樣 */}
                {/* <p>Please re-confirm your password:</p> */}
                {/* <input></input> */}
                {/* </label> */}
                <div>
                    {formError && <p>{formError}</p>}
                    {error && <p>{error}</p>}
                </div>

                <div className='mt-5'>
                    <Link
                        href='/'
                        className='bg-white rounded-sm text-black font-bold px-2 py-1 mt-1 mr-2'
                    >
                        Back
                    </Link>
                    <button
                        onClick={doSignup}
                        className='bg-white rounded-sm text-black font-bold px-2 py-1mt-1'
                    >
                        Sign Up!
                    </button>
                </div>
            </div>
        </>
    )
}

export default Signup
