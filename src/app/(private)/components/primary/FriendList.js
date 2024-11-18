import { useState, useEffect } from 'react'
import { Avatar, Spinner, Popover } from 'flowbite-react'
import moment from 'moment'
import TextField, { useText } from '#root/components/TextField'
import DeleteConfrim, { useDelete } from '#root/components/DeleteConfrim'
import Name from '#root/components/Name'
import useFetch from '#root/hooks/useFetch'
import { fetchFriends, removeFriend } from '#root/api/friend'
import { useAppStore } from '#root/app/store'
import useSocket from '#root/hooks/useSocket'

const FriendList = () => {
    const [search, setSearch, debounceSearch] = useText('', 300)
    const [list, setList] = useState([])
    const [dispatchFriend, friends, isLoading, error] = useFetch()
    const [enableRemove, setEnableRemove] = useState(false)

    useEffect(() => {
        dispatchFriend(fetchFriends)
    }, [])

    useEffect(() => {
        if (!friends) return
        setList(friends)
    }, [friends])

    useEffect(() => {
        if (!friends) return
        const result = friends.filter(friend => friend.name.includes(debounceSearch))
        setList(result)
    }, [debounceSearch])

    useSocket(
        (socket, { NEW_ROOM_MESSAGE }) => {
            const handler = ({ type, room, user, content, date }) => {
                const friendIndex = list.findIndex(friend => friend.roomId === room.id)
                if (friendIndex === -1) return

                const updatedFriend = {
                    ...list[friendIndex],
                    lastMessage: {
                        type,
                        content,
                        date,
                        by: room.type === 'group' ? user.name : null,
                    },
                }
                list.splice(friendIndex, 1)
                setList([updatedFriend, ...list])
            }
            socket.on(NEW_ROOM_MESSAGE, handler)
            return () => socket.off(NEW_ROOM_MESSAGE, handler)
        },
        [list]
    )

    /* Event */
    const toggleRemove = () => setEnableRemove(isOpen => !isOpen)

    return (
        <div className='h-full flex flex-col gap-3 bg-white dark:bg-slate-900 border-r-[1px] border-stone-300 dark:border-slate-700 overflow-y-auto'>
            <div className='flex items-center py-2 px-4'>
                <p className='mr-auto text-2xl'>
                    <span className='flex items-center h-12'>Chats</span>
                </p>
                <svg
                    class='ml-auto w-6 h-6 text-gray-800 dark:text-stone-200 cursor-pointer'
                    fill='none'
                    viewBox='0 0 24 24'
                    onClick={toggleRemove}
                >
                    <path
                        stroke='currentColor'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M5 12h14'
                    />
                </svg>
            </div>

            <div className='px-4'>
                <TextField
                    placeholder='Search'
                    value={search}
                    onChange={value => setSearch(value)}
                />
            </div>
            {isLoading && <Spinner />}
            {list && (
                <ul className='flex flex-col overflow-y-auto'>
                    {list.map((friend, index) => (
                        <Friend
                            key={index}
                            {...friend}
                            enableRemove={enableRemove}
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}

const Friend = ({ roomId, name, lastMessage, enableRemove }) => {
    const { setRoom } = useAppStore()
    const [dispatchRemove, isRemoved, isLoading, error] = useFetch()
    const { onOpen, ...removeConfrimProps } = useDelete({
        text: `Are you sure you want to delete ${name}?`,
        onConfirm: () => {
            dispatchRemove(() => removeFriend(roomId))
        },
    })

    const onClick = () => {
        setRoom(roomId)
    }

    /* render */
    let messageTime = ''
    if (lastMessage) {
        const message = moment(lastMessage.date)
        const isToday = moment().isSame(message, 'day')
        if (isToday) {
            messageTime = message.format('HH:mm')
        } else {
            messageTime = message.format('DD/MM/YYYY')
        }
    }

    return (
        <li className='flex'>
            <div
                className='flex-1 flex hover:bg-slate-100 hover:dark:bg-slate-700 cursor-pointer'
                onClick={onClick}
            >
                <Avatar
                    rounded
                    size='md'
                    className='px-4'
                />
                <div className='flex-1 border-b-2 border-b-stone-200 dark:border-b-slate-800 pr-4 py-2'>
                    <div className='flex-1 grid grid-rows-2 grid-cols-[1fr_auto] gap-y-2 gap-4'>
                        <Name
                            type='name'
                            className='truncate'
                        >
                            {name}
                        </Name>

                        {lastMessage && (
                            <>
                                <span className='text-sm text-slate-400'>{messageTime}</span>
                                <span className='col-span-2 truncate'>
                                    {lastMessage.by ? `${lastMessage.by} : ` : ''}
                                    {lastMessage.content}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {enableRemove && (
                <>
                    <div className='flex justify-center items-center w-8'>
                        {isLoading && <Spinner />}
                        {!isLoading && (
                            <Popover
                                trigger={error ? 'hover' : null}
                                placement='left'
                                content={<p className='py-1 px-2'>{error}</p>}
                            >
                                <span
                                    className='flex w-full h-full bg-rose-600  hover:bg-rose-500 border-b-stone-200 cursor-pointer'
                                    onClick={onOpen}
                                >
                                    <svg
                                        className='w-6 h-6 m-auto text-white'
                                        fill='currentColor'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                </span>
                            </Popover>
                        )}
                    </div>
                    <DeleteConfrim {...removeConfrimProps} />
                </>
            )}
        </li>
    )
}

export default FriendList
