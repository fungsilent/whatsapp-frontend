import { useEffect } from 'react'
import { useAppStore } from '#root/app/store'

export const socketEvent = {
    REFRESH_ROOM_INFO: 'REFRESH_ROOM_INFO',
    NEW_ROOM_MESSAGE: 'NEW_ROOM_MESSAGE',
    REMOVE_ROOM: 'REMOVE_ROOM',
    DISABLE_ROOM: 'DISABLE_ROOM',
    NEW_ROOM: 'NEW_ROOM',
    MEMBER_LEAVE_ROOM: 'MEMBER_LEAVE_ROOM',
    UPDATE_USER_INFO: 'UPDATE_USER_INFO',
}

const useSocket = (socketFunc, dependency = []) => {
    const { socket } = useAppStore()

    useEffect(() => {
        if (!socket) return
        return socketFunc(socket, socketEvent)
    }, [socket, ...dependency])
}

export default useSocket
