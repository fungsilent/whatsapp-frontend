import { useEffect } from 'react'
import useFetch from '#root/hooks/useFetch'
import { fetchRoomInfo } from '#root/api/room'
import { useAppStore } from '#root/app/store'
import Info from './Info'
import Chat from './Chat'
import MessageInput from './MessageInput'

const roomId = '673103eb3b986f7e172747b9'

const ChatSection = () => {
    // const { socket, roomId } = useAppStore()
    const [dispatchInfo, info, isLoading, error] = useFetch({ log: 'info' })
    const roomInfo = info ?? {}

    useEffect(() => {
        dispatchInfo(() => fetchRoomInfo(roomId))
    }, [])

    return (
        <section className='flex-1 flex flex-col'>
            <Info {...roomInfo} />
            <Chat roomId={roomId} />
            <MessageInput
                roomId={roomId}
                {...roomInfo}
            />
        </section>
    )
}

export default ChatSection
