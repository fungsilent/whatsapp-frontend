import { useEffect } from 'react'
import useFetch from '#root/hooks/useFetch'
import { fetchRoomInfo } from '#root/api/room'
import { useAppStore } from '#root/app/store'
import Info from './Info'
import Chat from './Chat'
import MessageInput from './MessageInput'

const roomId = '67335bea38ed19eafa61626f'

const ChatSection = () => {
    // const { socket, roomId } = useAppStore()
    const [dispatchInfo, info, isLoading, error] = useFetch()
    const roomInfo = info ?? {}

    useEffect(() => {
        dispatchInfo(() => fetchRoomInfo(roomId))
    }, [])

    return (
        <section className='flex-1 flex flex-col'>
            <Info {...roomInfo} />
            <Chat />
            <MessageInput />
        </section>
    )
}

export default ChatSection
