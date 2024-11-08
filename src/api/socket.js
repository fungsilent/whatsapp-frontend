import { io } from 'socket.io-client'

export const connectWebSocket = () => {
    return io(process.env.NEXT_PUBLIC_WEB_SOCKET_URL, {
        path: '/ws/',
        transports: ['websocket'],
        query: {
            token: localStorage.getItem('token'),
        },
    })
}
