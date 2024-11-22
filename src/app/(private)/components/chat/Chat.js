import { useEffect, Fragment } from 'react'
import moment from 'moment'
import clsx from 'clsx'
import { StickToBottom, useStickToBottomContext } from 'use-stick-to-bottom'
import Icon from '#root/components/Icon'
import Name from '#root/components/Name'
import useFetch from '#root/hooks/useFetch'
import useSocket from '#root/hooks/useSocket'
import { useAppStore } from '#root/app/store'
import { fetchRoomMessage } from '#root/api/room'

const Chat = ({ children }) => {
    const { roomId, messages, setMessages, addMessages } = useAppStore()
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

    // add new message to chat
    useSocket(
        (socket, { NEW_ROOM_MESSAGE }) => {
            const addNewMessage = ({ room, ...newMessage }) => {
                if (room.roomId === roomId) {
                    addMessages([newMessage])
                }
            }
            socket.on(NEW_ROOM_MESSAGE, addNewMessage)
            return () => socket.off(NEW_ROOM_MESSAGE, addNewMessage)
        },
        [roomId]
    )

    // update user info (display name)
    useSocket(
        (socket, { UPDATE_USER_INFO }) => {
            const updateUserInfo = userInfo => {
                setMessages(
                    messages.map(message => {
                        if (message.user.userId === userInfo.userId) {
                            return {
                                ...message,
                                user: {
                                    ...message.user,
                                    ...userInfo,
                                },
                            }
                        }
                        return message
                    })
                )
            }
            socket.on(UPDATE_USER_INFO, updateUserInfo)
            return () => socket.off(UPDATE_USER_INFO, updateUserInfo)
        },
        [messages]
    )

    return (
        <StickToBottom
            className='w-full h-full z-20 overflow-y-auto pr-[3px] relative'
            resize='smooth'
        >
            <StickToBottom.Content className='flex flex-col gap-2 py-3 px-6'>
                {messages.map((message, index) => {
                    const prevMessage = messages[index - 1]

                    // date
                    const currDate = moment(message.date).format('DD/MM/YYYY')
                    const prevDate = prevMessage ? moment(prevMessage.date).format('DD/MM/YYYY') : null
                    const isRenderDate = currDate !== prevDate

                    // user
                    const prevUser = prevMessage?.user.userId
                    const currUser = message.user.userId
                    const isRenderUser = prevUser !== currUser
                    return (
                        <Fragment key={index}>
                            {isRenderDate && (
                                <div className='flex justify-center sticky top-0 z-30 text-sm'>
                                    <p className='bg-sky-50 dark:bg-slate-600 text-gray-600 dark:text-stone-300 px-2 py-1 rounded'>
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
                {children}
            </StickToBottom.Content>
            <ScrollToEnd />
        </StickToBottom>
    )
}

const ScrollToEnd = () => {
    const { isAtBottom, scrollToBottom } = useStickToBottomContext()

    return (
        <>
            {!isAtBottom && (
                <i className='absolute right-3 bottom-4 z-30 p-2 cursor-pointer rounded-full bg-white dark:bg-slate-700'>
                    <svg
                        className='w-5 h-5 text-gray-800 dark:text-white'
                        fill='none'
                        viewBox='0 0 24 24'
                        onClick={scrollToBottom}
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
        <span className='w-8 h-8'>
            {showUser && (
                <Icon
                    name={user.name}
                    type='friend'
                />
            )}
        </span>
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
                        {/* <Name type='username'>{user.username}</Name> */}
                    </p>
                )}
                <p className='whitespace-pre-wrap break-all'>{content}</p>
                <p className='self-end text-xs text-gray-600 dark:text-gray-400'>{moment(date).format('HH:mm')}</p>
            </div>
        </div>
    )
}

export default Chat
