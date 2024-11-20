import { useState, useEffect } from 'react'
import { Spinner, Popover } from 'flowbite-react'
import clsx from 'clsx'
import moment from 'moment'
import { useText } from '#root/components/TextField'
import SearchField from '#root/components/SearchField'
import DeleteConfrim, { useDelete } from '#root/components/DeleteConfrim'
import Icon from '#root/components/Icon'
import Name from '#root/components/Name'
import { useAppStore } from '#root/app/store'
import useSocket from '#root/hooks/useSocket'
import useFetch from '#root/hooks/useFetch'
import { fetchRooms, removeRoom } from '#root/api/room'

const RoomList = () => {
    const [search, setSearch, debounceSearch] = useText('', 300)
    const [list, setList] = useState([])
    const [dispatchRoom, rooms, isLoading, error] = useFetch()
    const [enableRemove, setEnableRemove] = useState(false)

    useEffect(() => {
        dispatchRoom(fetchRooms)
    }, [])

    useEffect(() => {
        if (!rooms) return
        setList(rooms)
    }, [rooms])

    useEffect(() => {
        if (!rooms) return
        setList(rooms.filter(room => room.name.includes(debounceSearch)))
    }, [debounceSearch])

    // add new room to list
    useSocket(
        (socket, { NEW_ROOM }) => {
            const addNewRoom = newRoom => {
                setList([newRoom, ...list])
            }
            socket.on(NEW_ROOM, addNewRoom)
            return () => socket.off(NEW_ROOM, addNewRoom)
        },
        [list]
    )

    // delete room from list
    useSocket(
        (socket, { REMOVE_ROOM }) => {
            const removeRoom = ({ roomId: removedRoomId }) => {
                setList(list.filter(room => room.roomId !== removedRoomId))
            }
            socket.on(REMOVE_ROOM, removeRoom)
            return () => socket.off(REMOVE_ROOM, removeRoom)
        },
        [list]
    )

    // modify room data in list
    useSocket(
        (socket, { NEW_ROOM_MESSAGE, DISABLE_ROOM }) => {
            // update room last message
            const updateLastMessage = ({ type, room, user, content, date }) => {
                setList(
                    updateFriend(list, room.id, {
                        lastMessage: {
                            type,
                            content,
                            date,
                            by: room.type === 'group' ? user.name : null,
                        },
                    })
                )
            }
            socket.on(NEW_ROOM_MESSAGE, updateLastMessage)

            // update room disabled
            const updateDisabled = ({ roomId: disabledRoomId }) => {
                setList(
                    updateFriend(list, disabledRoomId, {
                        isDisable: true,
                    })
                )
            }
            socket.on(DISABLE_ROOM, updateDisabled)

            return () => {
                socket.off(NEW_ROOM_MESSAGE, updateLastMessage)
                socket.off(DISABLE_ROOM, updateDisabled)
            }
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
                    className='ml-auto w-6 h-6 cursor-pointer'
                    fill='none'
                    viewBox='0 0 24 24'
                    onClick={toggleRemove}
                >
                    <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5 12h14'
                    />
                </svg>
            </div>

            <div className='px-4'>
                <SearchField
                    placeholder='Search'
                    value={search}
                    onChange={value => setSearch(value)}
                />
            </div>
            {isLoading && (
                <div className='py-6 text-center'>
                    <Spinner />
                </div>
            )}
            {!isLoading && !!list.length && (
                <ul className='flex flex-col overflow-y-auto'>
                    {list.map(room => (
                        <Chat
                            key={room.roomId}
                            {...room}
                            enableRemove={enableRemove}
                        />
                    ))}
                </ul>
            )}
            {!isLoading && !list.length && <p className='py-6 text-sm text-center'>No chats found</p>}
        </div>
    )
}

const Chat = ({ roomId, name, lastMessage, isDisable, enableRemove, type }) => {
    const { setRoom } = useAppStore()
    const [dispatchRemove, isRemoved, isLoading, error] = useFetch()
    const { onOpen, ...removeConfrimProps } = useDelete()

    const onConfirm = () => {
        dispatchRemove(() => removeRoom(roomId))
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
                className='flex-1 flex items-center hover:bg-slate-100 hover:dark:bg-slate-700 cursor-pointer'
                onClick={() => setRoom(roomId)}
            >
                <Icon
                    name={name}
                    type={type}
                    className='mx-4'
                />

                <div className='flex-1 grid grid-rows-2 grid-cols-1 gap-2 border-b-2 border-b-stone-200 dark:border-b-slate-800 pr-4 py-2'>
                    {/* <div className='flex-1 grid grid-rows-2 grid-cols-[1fr_auto] gap-y-2 gap-4'> */}
                    <div className='grid grid-cols-[1fr_auto]'>
                        <Name
                            type='name'
                            className='truncate'
                        >
                            {name}
                        </Name>
                        <span className='text-sm text-slate-400'>{messageTime}</span>
                        {/* {lastMessage && (
                            <>
                                <span className='truncate'>
                                    {lastMessage.by ? `${lastMessage.by} : ` : ''}
                                    {lastMessage.content}
                                </span>
                            </>
                        )} */}
                    </div>
                    <div className='grid grid-cols-[1fr_auto]'>
                        {lastMessage && (
                            <span className='truncate'>
                                {lastMessage.by ? `${lastMessage.by} : ` : ''}
                                {lastMessage.content}
                            </span>
                        )}
                        {isDisable && (
                            <svg
                                className='w-6 h-6 text-gray-500 dark:text-white'
                                viewBox='0 0 24 24'
                                fill='currentColor'
                            >
                                <path d='M3.28034 2.21968C2.98745 1.92678 2.51257 1.92677 2.21968 2.21966C1.92678 2.51255 1.92677 2.98743 2.21966 3.28032L4.41838 5.47908C2.91114 7.2299 2 9.50855 2 12C2 13.6203 2.38637 15.186 3.11461 16.5922L2.04695 20.4151C1.98549 20.6349 1.98546 20.8676 2.04691 21.0876C2.23258 21.7525 2.92212 22.141 3.58704 21.9553L7.41286 20.888C8.81782 21.6146 10.3817 22 12 22C14.4914 22 16.77 21.0889 18.5208 19.5818L20.7194 21.7805C21.0123 22.0734 21.4872 22.0734 21.7801 21.7805C22.073 21.4876 22.073 21.0127 21.7801 20.7198L3.28034 2.21968ZM17.4566 18.5176C15.9802 19.755 14.0771 20.5 12 20.5C10.5322 20.5 9.12006 20.1281 7.86709 19.4295L7.59755 19.2792L3.61096 20.3914L4.72368 16.4073L4.57303 16.1375C3.87277 14.8834 3.5 13.4696 3.5 12C3.5 9.92285 4.24507 8.01971 5.48254 6.54326L8.48673 9.54752C8.20238 9.65413 8 9.92843 8 10.25C8 10.6642 8.33579 11 8.75 11H9.93919L11.9392 13H8.75L8.64823 13.0069C8.28215 13.0565 8 13.3703 8 13.75C8 14.1642 8.33579 14.5 8.75 14.5H13.2483L13.35 14.4932C13.3735 14.49 13.3967 14.4857 13.4195 14.4804L17.4566 18.5176Z' />
                                <path d='M15.2545 9.50001H12.6818L14.1818 11H15.2545L15.3563 10.9932C15.7223 10.9435 16.0045 10.6297 16.0045 10.25C16.0045 9.83579 15.6687 9.50001 15.2545 9.50001Z' />
                                <path d='M20.5 12C20.5 13.5302 20.0957 14.966 19.388 16.2063L20.4816 17.2999C21.4438 15.7634 22 13.9466 22 12C22 6.47716 17.5228 2.00001 12 2.00001C10.0534 2.00001 8.23677 2.55619 6.70025 3.5183L7.79388 4.61195C9.03415 3.90432 10.4699 3.50001 12 3.50001C16.6944 3.50001 20.5 7.30559 20.5 12Z' />
                            </svg>
                        )}
                    </div>

                    {/* </div> */}
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
                    <DeleteConfrim
                        {...removeConfrimProps}
                        text={`Are you sure you want to delete ${name}?`}
                        onConfirm={onConfirm}
                    />
                </>
            )}
        </li>
    )
}

/*
 * Helper
 */
const updateFriend = (list, roomId, data) => {
    const idnex = list.findIndex(room => room.roomId === roomId)
    if (idnex === -1) return list

    const updatedFriend = {
        ...list[idnex],
        ...data,
    }
    list.splice(idnex, 1)
    return [updatedFriend, ...list]
}

export default RoomList
