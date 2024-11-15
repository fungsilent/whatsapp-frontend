import { useState, useEffect } from 'react'
import useFetch from '#root/hooks/useFetch'
import { sendRoomMessage } from '#root/api/room'

const MessageInput = ({ roomId }) => {
    const [message, setMessage] = useState('')
    const [dispatchSend, isSent, isLoading, error] = useFetch()

    const onChange = event => {
        setMessage(event.target.value)
    }

    const onEnter = () => {
        dispatchSend(() => sendRoomMessage(roomId, { message }))
    }

    useEffect(() => {
        if (!!isSent) {
            setMessage('')
        }
    }, [!!isSent])

    return (
        <div className='flex gap-4 py-2 px-3 z-20 bg-stone-200 dark:bg-slate-800'>
            {/* {[...Array(2)].map((item, index) => (
                <i
                    key={index}
                    className='rounded-full w-10 h-10 aspect-square bg-slate-600 cursor-pointer'
                />
            ))} */}
            <input
                className='w-full rounded px-3 py-1 bg-slate-100 dark:bg-slate-600 placeholder-gray-400 outline-none'
                placeholder='Type a message'
                value={message}
                onChange={onChange}
                onKeyDown={event => {
                    if (event.key === 'Enter') onEnter()
                }}
            />
        </div>
    )
}

export default MessageInput
