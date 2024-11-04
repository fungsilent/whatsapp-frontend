'use client'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useAppStore } from '#root/app/store'

const SocketLayout = ({ children }) => {
    const { setSocket } = useAppStore()

    useEffect(() => {
        const socket = io(process.env.NEXT_PUBLIC_WEB_SOCKET_URL, {
            extraHeaders: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        setSocket(socket)
    }, [])

    return children
}

export default SocketLayout
