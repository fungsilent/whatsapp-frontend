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
    const [dispatchInfo, info, isLoading, error] = useFetch({})
    const roomInfo = info ?? {}

    useEffect(() => {
        dispatchInfo(() => fetchRoomInfo(roomId))
    }, [])

    return (
        <section className='flex-1 flex flex-col relative bg-sky-100 dark:bg-slate-950 '>
            <i
                className='absolute left-0 top-0 w-full h-full opacity-20 z-10 '
                style={{
                    backgroundAttachment: 'fixed',
                    backgroundRepeat: true,
                    backgroundImage: 'url("https://static.whatsapp.net/rsrc.php/v3/yl/r/gi_DckOUM5a.png")',
                }}
            />
            <Info {...roomInfo} />
            <Chat roomId={roomId} />
            <MessageInput roomId={roomId} />
        </section>
    )
}

export default ChatSection
