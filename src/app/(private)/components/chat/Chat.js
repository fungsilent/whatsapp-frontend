import { useState, useEffect, Fragment } from 'react'
import moment from 'moment'
import clsx from 'clsx'
import ScrollToBottom from 'react-scroll-to-bottom'
import { Avatar } from 'flowbite-react'
import { useAppStore } from '#root/app/store'
import useFetch from '#root/hooks/useFetch'
import { fetchRoomMessage } from '#root/api/room'

const Chat = ({ roomId }) => {
    const { socket } = useAppStore()
    const [dataset, setDataset] = useState([])
    const [dispatchMessage, messages, isLoading, error] = useFetch({})
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
        if (!socket) return
        socket.on('added_room_message', newMessage => {
            setDataset(dataset => [...dataset, newMessage])
        })
    }, [socket])

    useEffect(() => {
        if (!messages) return
        setDataset([...messages, ...dataset])
    }, [isLoading])

    return (
        <ScrollToBottom
            className='w-full h-full z-20 overflow-y-auto'
            scrollViewClassName='flex flex-col gap-2 py-3 px-6'
        >
            {dataset.map((message, index) => {
                const prevMessage = dataset[index - 1]

                // date
                const currDate = moment(message.date).format('DD/MM/YYYY')
                const prevDate = prevMessage ? moment(prevMessage.date).format('DD/MM/YYYY') : null

                // user
                const prevUser = prevMessage?.user.id
                const currUser = message.user.id
                return (
                    <Fragment key={index}>
                        {currDate !== prevDate && (
                            <div className='flex justify-center sticky top-0 text-sm'>
                                <p className='bg-sky-50 dark:bg-slate-700 text-gray-600 dark:text-stone-300 px-2 py-1 rounded'>
                                    {currDate}
                                </p>
                            </div>
                        )}
                        <Message
                            {...message}
                            showUser={prevUser !== currUser}
                        />
                    </Fragment>
                )
            })}
        </ScrollToBottom>
    )
}

const Message = ({ showUser, user, content, date }) => {
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
        <div className={clsx('flex gap-3 z-20 max-w-[60%]', { 'self-end': user.isSelf })}>
            {!user.isSelf && renderIcon()}
            <div
                className={clsx('flex flex-col bg-sky-50 dark:bg-slate-700 p-2 rounded drop-shadow-sm', {
                    'bg-sky-50 dark:bg-teal-900': user.isSelf,
                })}
            >
                <p className='flex gap-2 text-sm'>
                    <span
                        className={clsx('text-sky-950 dark:text-sky-400', {
                            'text-cyan-500 dark:text-cyan-400': user.isSelf,
                        })}
                    >
                        {user.name}
                    </span>
                    <span className='text-gray-600 dark:text-stone-400'>{user.username}</span>
                </p>
                <p>{content}</p>
                <p className='self-end text-xs text-gray-600 dark:text-gray-400'>{moment(date).format('HH:mm')}</p>
            </div>
        </div>
    )
}

export default Chat
