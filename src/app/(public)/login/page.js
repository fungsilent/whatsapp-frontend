'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import useFetch from '#root/hooks/useFetch'
import { useAppStore } from '#root/app/store'
import { signin } from '#root/api/user'
import { Card, Title, FormField, Button } from '#root/app/(public)/components/share'

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

    const setFormValue = (name, value) => {
        setForm(state => ({
            ...state,
            [name]: value,
        }))
    }

    return (
        <section className='flex flex-col items-center justify-center px-6 py-8 h-screen'>
            <i className='flex items-center mb-6 text-2xl font-semibold text-white'>
                <img
                    className='w-8 h-8 mr-2'
                    src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
                    alt='logo'
                />
                WhatsLam
            </i>
            <Card>
                <Title title='Sign in to your account' />

                <form className='space-y-4 md:space-y-6'>
                    <div>
                        <label className='block mb-2 text-sm font-medium'>Username</label>
                        <FormField
                            name='username'
                            type='text'
                            value={username}
                            onChange={value => setFormValue('username', value)}
                            onEnter={doLogin}
                        />
                    </div>

                    <div>
                        <label className='block mb-2 text-sm font-medium '>Password</label>
                        <FormField
                            name='password'
                            type='password'
                            value={password}
                            onChange={value => setFormValue('password', value)}
                            onEnter={doLogin}
                        />
                    </div>

                    <Button
                        isLoading={isLoading}
                        text='Sign in'
                        onClick={doLogin}
                    />

                    {error && <p className='text-rose-600'>{error}</p>}

                    <p className='text-sm font-light text-gray-600 dark:text-white'>
                        Don't have an account yet?{' '}
                        <Link
                            href='/signup'
                            className='font-medium text-yellow-600 dark:text-yellow-300 hover:underline'
                        >
                            Sign up
                        </Link>
                    </p>
                </form>
            </Card>
        </section>
    )
}

export default LoginPage
