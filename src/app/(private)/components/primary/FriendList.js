import { useState, useEffect } from 'react'
import { Avatar, Spinner } from 'flowbite-react'
import moment from 'moment'
import TextField, { useText } from '#root/components/TextField'
import Name from '#root/components/Name'
import useFetch from '#root/hooks/useFetch'
import { fetchFriends } from '#root/api/friend'
import { useAppStore } from '#root/app/store'
import useSocket from '#root/hooks/useSocket'

const FriendList = () => {
    const [search, setSearch, debounceSearch] = useText('', 300)
    const [list, setList] = useState([])
    const [dispatchFriend, friends, isLoading, error] = useFetch()

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

    return (
        <div className='h-full flex flex-col gap-3 bg-white dark:bg-slate-900 border-r-[1px] border-stone-300 dark:border-slate-700 overflow-y-auto'>
            <p className=' py-2 px-4 text-2xl'>
                <span className='flex items-center h-12'>Chats</span>
            </p>
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
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}

const Friend = ({ roomId, name, lastMessage }) => {
    const { setRoom } = useAppStore()

    const onClick = () => {
        setRoom(roomId)
    }

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
        <li
            className='flex hover:bg-slate-100 hover:dark:bg-slate-700 cursor-pointer'
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
        </li>
    )
}

export default FriendList
