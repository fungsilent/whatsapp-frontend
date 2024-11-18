import { useEffect, Fragment } from 'react'
import moment from 'moment'
import clsx from 'clsx'
import ScrollToBottom, { useSticky, useScrollToEnd } from 'react-scroll-to-bottom'
import { Avatar } from 'flowbite-react'
import Name from '#root/components/Name'
import useFetch from '#root/hooks/useFetch'
import useSocket from '#root/hooks/useSocket'
import { useChatStore } from './store'
import { fetchRoomMessage } from '#root/api/room'

const Chat = ({ roomId }) => {
    const { messages, setMessages, addMessages } = useChatStore()
    const [dispatchMessage, newMessages, isLoading, error] = useFetch()
    /*
     * TODO: don't fetch all in once, paging is must, but not today :(
     * Fung Lee
     */
    // const [{ page, perPage }, setSearch] = useState({
    //     page: 1,
    //     perPage: 10,
    // })

    useEffect(() => {
        dispatchMessage(() =>
            fetchRoomMessage(roomId, {
                // page,
                // perPage,
            })
        )
    }, [roomId])

    useEffect(() => {
        if (!newMessages) return
        setMessages(newMessages)
    }, [isLoading])

    useSocket(
        (socket, { NEW_ROOM_MESSAGE }) => {
            const handler = ({ room, ...newMessage }) => {
                if (room.id === roomId) {
                    addMessages([newMessage])
                }
            }
            socket.on(NEW_ROOM_MESSAGE, handler)
            return () => socket.off(NEW_ROOM_MESSAGE, handler)
        },
        [roomId]
    )

    return (
        <ScrollToBottom
            className='w-full h-full z-20 overflow-y-auto pr-[3px]'
            scrollViewClassName='flex flex-col gap-2 py-3 px-6'
            followButtonClassName='hidden'
        >
            <ScrollToEnd />
            {messages.map((message, index) => {
                const prevMessage = messages[index - 1]

                // date
                const currDate = moment(message.date).format('DD/MM/YYYY')
                const prevDate = prevMessage ? moment(prevMessage.date).format('DD/MM/YYYY') : null
                const isRenderDate = currDate !== prevDate

                // user
                const prevUser = prevMessage?.user.id
                const currUser = message.user.id
                const isRenderUser = prevUser !== currUser
                return (
                    <Fragment key={index}>
                        {isRenderDate && (
                            <div className='flex justify-center sticky top-0 z-30 text-sm'>
                                <p className='bg-sky-50 dark:bg-slate-700 text-gray-600 dark:text-stone-300 px-2 py-1 rounded'>
                                    {currDate}
                                </p>
                            </div>
                        )}
                        <Message
                            {...message}
                            showUser={isRenderDate || isRenderUser}
                        />
                    </Fragment>
                )
            })}
        </ScrollToBottom>
    )
}

const ScrollToEnd = () => {
    const [sticky] = useSticky()
    const scrollToEnd = useScrollToEnd()

    return (
        <>
            {!sticky && (
                <i className='absolute right-3 bottom-4 z-30 p-2 cursor-pointer rounded-full bg-white dark:bg-slate-700'>
                    <svg
                        className='w-5 h-5 text-gray-800 dark:text-white'
                        fill='none'
                        viewBox='0 0 24 24'
                        onClick={scrollToEnd}
                    >
                        <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='m19 9-7 7-7-7'
                        />
                    </svg>
                </i>
            )}
        </>
    )
}

const Message = ({ showUser, messageId, user, content, date }) => {
    const renderIcon = () => (
        <i className='w-8 h-8'>
            {showUser && (
                <Avatar
                    rounded
                    size='sm'
                    className='mr-auto justify-start'
                />
            )}
        </i>
    )

    return (
        <div className={clsx('flex gap-3 z-20 max-w-[60%]', { 'self-end mr-7': user.isSelf })}>
            {!user.isSelf && renderIcon()}
            <div
                className={clsx('flex flex-col bg-sky-50 dark:bg-slate-700 p-2 rounded drop-shadow-sm', {
                    'bg-green-200 dark:bg-teal-800': user.isSelf,
                })}
            >
                {!user.isSelf && (
                    <p className='flex gap-2 text-sm'>
                        <Name type='name'>{user.name}</Name>
                        <Name type='username'>{user.username}</Name>
                    </p>
                )}
                <p>{content}</p>
                <p className='self-end text-xs text-gray-600 dark:text-gray-400'>{moment(date).format('HH:mm')}</p>
            </div>
        </div>
    )
}

export default Chat
