import { useState } from 'react'
import clsx from 'clsx'
import Info from './Info'
import Chat from './Chat'
import MessageInput from './MessageInput'
import Panel from './panel/Container'
import NotFound from './NotFound'
import { useAppStore } from '#root/app/store'
import { useChatStore } from './store'

const ChatContainer = () => {
    const { roomId } = useAppStore()
    const { panel, setPanel } = useChatStore()

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
                    <div
                        className={clsx(
                            'flex flex-col bg-blue-200 dark:bg-slate-950 overflow-hidden transition-[width] duration-150'
                        )}
                        style={{
                            width: `calc(100% - ${!!panel ? panelWidth : 0}px)`,
                        }}
                    >
                        <Info
                            roomId={roomId}
                            setPanel={setPanel}
                        />
                        <Chat roomId={roomId} />
                        <MessageInput roomId={roomId} />
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
