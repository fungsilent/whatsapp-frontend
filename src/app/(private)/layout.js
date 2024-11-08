'use client'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useAppStore } from '#root/app/store'
import { connectWebSocket } from '#root/api/socket'
import Loader from '#root/components/Loader'

const PrivateLayout = ({ children }) => {
    const { isAuth, setSocket } = useAppStore()

    useEffect(() => {
        setSocket(connectWebSocket())
    }, [])

    if (!isAuth) {
        redirect('/login')
    }

    return (
        <>
            {!isAuth && <Loader full />}
            {isAuth && children}
        </>
    )
}

export default PrivateLayout
