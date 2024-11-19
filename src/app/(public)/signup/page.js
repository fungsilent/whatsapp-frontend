'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useFetch from '#root/hooks/useFetch'
import { signup } from '#root/api/user'
import Link from 'next/link'
import { useAppStore } from '#root/app/store'
import { Card, Title, FormField, Button } from '#root/app/(public)/components/share'

const SignupPage = () => {
    const { setUser } = useAppStore()
    const router = useRouter()
    const [dispatchSignup, user, isLoading, error] = useFetch()
    const [formError, setFormError] = useState('')
    const [form, setForm] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
    })

    useEffect(() => {
        if (user) {
            setUser(user)
            router.push('/')
        }
    }, [user])

    const doSignup = () => {
        if (form.password !== form.confirmPassword) {
            return setFormError('Confirm password incorrect')
        }
        dispatchSignup(() => signup(form))
    }

    // 如果撞名彈警告
    const onFormChange = (name, value) => {
        if (formError) setFormError('')
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

    const onEnter = event => {
        event.preventDefault()
        const form = event.target.form
        const index = [...form].indexOf(event.target)
        form[(index + 1) % form.length].focus()
    }

    return (
        <>
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
                    <Title title='Create an account' />

                    <form className='space-y-4 md:space-y-6'>
                        <div>
                            <label className='block mb-2 text-sm font-medium'>Your username</label>
                            <FormField
                                name='username'
                                type='text'
                                value={form.username}
                                onChange={value => onFormChange('username', value)}
                                onEnter={onEnter}
                                minLength={4}
                                maxLength={10}
                                required
                            />
                        </div>

                        <div>
                            <label className='block mb-2 text-sm font-medium'>Your diaply name</label>
                            <FormField
                                name='name'
                                type='text'
                                value={form.name}
                                onChange={value => onFormChange('name', value)}
                                onEnter={onEnter}
                                minLength={4}
                                maxLength={10}
                                required
                            />
                        </div>

                        <div>
                            <label className='block mb-2 text-sm font-medium'>Password</label>
                            <FormField
                                name='password'
                                type='password'
                                value={form.password}
                                onChange={value => onFormChange('password', value)}
                                onEnter={onEnter}
                                minLength={4}
                                maxLength={10}
                                required
                            />
                        </div>

                        <div>
                            <label className='block mb-2 text-sm font-medium'>Confirm password</label>
                            <FormField
                                name='confirmPassword'
                                type='password'
                                value={form.confirmPassword}
                                onChange={value => onFormChange('confirmPassword', value)}
                                onEnter={onEnter}
                                minLength={4}
                                maxLength={20}
                                required
                            />
                        </div>

                        {(!!formError || !!error) && <p className='text-rose-600'>{formError || error}</p>}

                        <Button
                            isLoading={isLoading}
                            text='Create an account'
                            onClick={doSignup}
                        />

                        <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                            Already have an account?{' '}
                            <Link
                                href='/login'
                                className='font-medium text-yellow-600 dark:text-yellow-300 hover:underline'
                            >
                                Login here
                            </Link>
                        </p>
                    </form>
                </Card>
            </section>
        </>
    )
}

export default SignupPage
