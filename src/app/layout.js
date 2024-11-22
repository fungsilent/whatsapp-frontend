'use client'
import { useState, useEffect } from 'react'
import { Flowbite } from 'flowbite-react'
import { useAppStore } from '#root/app/store'
import { fetchUserInfo } from '#root/api/user'
import useFetch from '#root/hooks/useFetch'
import Loader from '#root/components/Loader'
import '#root/app/globals.css'

const STATUS = {
    PENDING: 'PENDING',
    PREPARED: 'PREPARED',
}

const RootLayout = ({ children }) => {
    const { setUser } = useAppStore()
    const [status, setStatus] = useState(STATUS.PENDING)
    const [dispatchFetch, user, isLoading, error] = useFetch({
        initLoading: true,
    })

    useEffect(() => {
        dispatchFetch(fetchUserInfo)
    }, [])

    useEffect(() => {
        if (isLoading) return
        setUser(user)
        setStatus(STATUS.PREPARED)
    }, [isLoading])

    return (
        <html>
            <head>
                <link
                    rel='icon'
                    href='logo.svg'
                />
            </head>
            <Flowbite theme={{ mode: 'dark' }}>
                <body className='bg-white dark:bg-zinc-800 text-stone-800 dark:text-stone-100'>
                    {status === STATUS.PENDING && <Loader full />}
                    {status === STATUS.PREPARED && children}
                </body>
            </Flowbite>
        </html>
    )
}

export default RootLayout
