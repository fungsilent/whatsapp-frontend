import { useEffect } from 'react'
import { Spinner } from 'flowbite-react'
import clsx from 'clsx'
import Info from './Info'
import Chat from './Chat'
import MessageInput from './MessageInput'
import Panel from './panel/Container'
import NotFound from './NotFound'
import { useAppStore } from '#root/app/store'
import useSocket from '#root/hooks/useSocket'
import useFetch from '#root/hooks/useFetch'
import { fetchRoomInfo } from '#root/api/room'

const ChatContainer = () => {
    const { roomId, info, panel, setInfo, setPanel, resetRoom } = useAppStore()
    const [dispatchInfo, roomInfo, isLoading, error] = useFetch()

    /* fetch data */
    useEffect(() => {
        if (!roomId) return
        dispatchInfo(() => fetchRoomInfo(roomId))
    }, [roomId])

    useEffect(() => {
        if (!roomInfo) return
        setInfo(roomInfo)
    }, [isLoading])

    /* socket */
    useSocket(
        (socket, { REFRESH_ROOM_INFO }) => {
            const refreshRoomInfo = ({ roomId: refreshRoomId, ...info }) => {
                if (refreshRoomId !== roomId) return
                setInfo(info)
            }
            socket.on(REFRESH_ROOM_INFO, refreshRoomInfo)
            return () => socket.off(REFRESH_ROOM_INFO, refreshRoomInfo)
        },
        [roomId]
    )

    useSocket(
        (socket, { REMOVE_ROOM }) => {
            const removeRoom = ({ roomId: removedRoomId }) => {
                if (roomId === removedRoomId) {
                    resetRoom()
                }
            }
            socket.on(REMOVE_ROOM, removeRoom)
            return () => socket.off(REMOVE_ROOM, removeRoom)
        },
        [roomId]
    )

    /* render */
    const panelWidth = !!panel ? 360 : 0

    return (
        <>
            {!roomId && <NotFound />}
            {roomId && (
                <section className='flex-1 flex relative bg-blue-200 dark:bg-slate-950 overflow-hidden'>
                    <i
                        className='absolute left-0 top-0 w-full h-full opacity-20 z-10 '
                        style={{
                            backgroundAttachment: 'fixed',
                            backgroundRepeat: true,
                            backgroundImage: 'url("https://static.whatsapp.net/rsrc.php/v3/yl/r/gi_DckOUM5a.png")',
                        }}
                    />
                    {isLoading && (
                        <div className='absolute z-50 left-[50%] top-[120px] translate-x-[-50%]'>
                            <Spinner size='lg' />
                        </div>
                    )}
                    <div
                        className={clsx(
                            'flex flex-col bg-blue-200 dark:bg-slate-950 overflow-hidden transition-[width] duration-150'
                        )}
                        style={{
                            width: `calc(100% - ${!!panel ? panelWidth : 0}px)`,
                        }}
                    >
                        <Info
                            info={info}
                            setPanel={setPanel}
                        />
                        <Chat roomId={roomId} />
                        <MessageInput
                            roomId={roomId}
                            info={info}
                        />
                    </div>
                    <Panel
                        roomId={roomId}
                        width={panelWidth}
                        panel={panel}
                        setPanel={setPanel}
                    />
                </section>
            )}
        </>
    )
}

export default ChatContainer
