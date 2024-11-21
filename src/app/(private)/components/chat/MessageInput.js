import { useState, useEffect } from 'react'
import { Textarea } from 'flowbite-react'
import useFetch from '#root/hooks/useFetch'
import { sendRoomMessage } from '#root/api/room'
import Loader from '#root/components/Loader'

const MessageInput = ({ roomId, info: { isDisable } }) => {
    const [message, setMessage] = useState('')
    const [dispatchSend, isSent, isLoading, error] = useFetch()

    const onEnter = () => {
        if (message) {
            dispatchSend(() => sendRoomMessage(roomId, { message }))
        }
    }

    useEffect(() => {
        if (isSent) {
            setMessage('')
        }
    }, [isSent])

    useEffect(() => {
        if (isDisable) {
            setMessage('')
        }
    }, [isDisable])

    useEffect(() => {
        const textarea = document.getElementById('message-input')
        if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }, [message])

    return (
        <div className='py-2 px-3 z-20 bg-stone-200 dark:bg-slate-800 relative'>
            <Textarea
                id='message-input'
                className='resize-none bg-white dark:bg-slate-600 max-h-40 rounded border-0 focus:border-0 focus:ring-0'
                placeholder={isDisable ? 'Chat closed' : 'Type a message'}
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        onEnter()
                    }
                }}
                disabled={isDisable || isLoading}
                rows={1}
            />
            {error && (
                <p
                    className='text-red-500 text-sm mt-2'
                    role='alert'
                >
                    Error sending message: {error}
                </p>
            )}
            {isLoading && (
                <Loader
                    classNames={{
                        container: 'absolute left-0 bottom-full w-full',
                        loader: '!rounded-none !h-1',
                    }}
                />
            )}
        </div>
    )
}

export default MessageInput
