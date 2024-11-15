import { useState, useEffect, Fragment } from 'react'
import moment from 'moment'
import { Avatar } from 'flowbite-react'
import { useAppStore } from '#root/app/store'
import useFetch from '#root/hooks/useFetch'
import { fetchRoomMessage } from '#root/api/room'

const Chat = ({ roomId }) => {
    const [dataset, setDataset] = useState([])
    const [dispatchMessage, messages, isLoading, error] = useFetch({})
    const [{ page, perPage }, setSearch] = useState({
        page: 1,
        perPage: 10,
    })

    useEffect(() => {
        dispatchMessage(() =>
            fetchRoomMessage(roomId, {
                page,
                perPage,
            })
        )
    }, [roomId, page])

    useEffect(() => {
        if (!messages) return
        setDataset([...dataset, messages[0], ...messages, ...messages, ...messages, ...messages])
    }, [isLoading])

    return (
        <div className='flex-1 flex flex-col gap-2 w-full h-full z-20 overflow-y-auto'>
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
                        {currDate !== prevDate && <div>{currDate}</div>}
                        <Message
                            {...message}
                            showUser={prevUser !== currUser}
                        />
                    </Fragment>
                )
            })}
        </div>
    )
}

const Message = props => {
    console.log('props', props)
    const { showUser, user, content, date } = props

    return (
        <div className='flex gap-2 z-20'>
            <i className='w-8 h-8'>
                {showUser && (
                    <Avatar
                        rounded
                        size='sm'
                        className='mr-auto justify-start'
                    />
                )}
            </i>
            <div className='flex flex-col bg-sky-200 dark:bg-slate-700  p-2 rounded'>
                <p className='flex gap-2 text-sm'>
                    <span className='text-sky-950 dark:text-sky-400'>{user.name}</span>
                    <span className='text-gray-600 dark:text-stone-400'>{user.username}</span>
                </p>
                <p>{content}</p>
                <p className='self-end text-xs text-gray-600 dark:text-gray-400'>{moment(date).format('HH:mm')}</p>
            </div>
        </div>
    )
}

export default Chat
