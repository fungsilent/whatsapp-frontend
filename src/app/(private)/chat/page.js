'use client'
import { useAppStore } from '#root/app/store'

const ChatPage = () => {
    const { socket } = useAppStore()
    console.log('socket', socket)
    return <div>ChatPage</div>
}

export default ChatPage
