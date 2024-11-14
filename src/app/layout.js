"use client"
import { useState, useEffect } from "react"
import { ThemeModeScript } from "flowbite-react"
import { useAppStore } from "#root/app/store"
import { fetchUserInfo } from "#root/api/user"
import useFetch from "#root/hooks/useFetch"
import Loader from "#root/components/Loader"
import "#root/app/globals.css"

const STATUS = {
    PENDING: "PENDING",
    PREPARED: "PREPARED",
}

const RootLayout = ({ children }) => {
    const { setUser } = useAppStore()
    const [status, setStatus] = useState(STATUS.PENDING)
    const [dispatchFetch, user, isLoading, error] = useFetch({
        initLoading: true,
        // log: 'fetchUserInfo',
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
        <html suppressHydrationWarning>
            <head>
                <ThemeModeScript />
            </head>

            <body className="bg-zinc-800 text-stone-900 dark:text-stone-200">
                {status === STATUS.PENDING && <Loader full />}
                {status === STATUS.PREPARED && children}
            </body>
        </html>
    )
}

export default RootLayout
