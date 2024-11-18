import { useEffect } from 'react'
import { useAppStore } from '#root/app/store'

export const socketEvent = {
    REFRESH_ROOM_INFO: 'REFRESH_ROOM_INFO',
    NEW_ROOM_MESSAGE: 'NEW_ROOM_MESSAGE',
}

const useSocket = socketFunc => {
    const { socket } = useAppStore()

    useEffect(() => {
        if (!socket) return
        socketFunc(socket, socketEvent)
    }, [socket])
}

export default useSocket
