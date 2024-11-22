import { useRef, useState, useEffect } from 'react'
import { Textarea } from 'flowbite-react'
import Loader from '#root/components/Loader'
import useFetch from '#root/hooks/useFetch'
import { useAppStore } from '#root/app/store'
import { sendRoomMessage } from '#root/api/room'

const MessageInput = () => {
    const {
        roomId,
        info: { isDisable },
    } = useAppStore()
    const input = useRef()
    const [message, setMessage] = useState('')
    const [dispatchSend, isSent, isLoading, error] = useFetch()

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
        const textarea = input.current
        if (!textarea) return
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
    }, [message])

    const onSend = () => {
        if (message) {
            dispatchSend(() => sendRoomMessage(roomId, { message }))
        }
    }

    return (
        <div className='py-2 px-3 z-20 bg-stone-200 dark:bg-slate-800 relative'>
            <div className='flex items-end gap-3'>
                <Textarea
                    ref={input}
                    className='resize-none bg-white dark:bg-slate-600 max-h-44 rounded border-0 focus:border-0 focus:ring-0'
                    placeholder={isDisable ? 'Chat closed' : 'Type a message'}
                    value={message}
                    maxLength={3000}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            onSend()
                        }
                    }}
                    disabled={isDisable || isLoading}
                    rows={1}
                    style={{ height: 'auto' }}
                />
                <svg
                    className='shrink-0 w-6 h-9 text-gray-800 dark:text-stone-200 cursor-pointer'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    onClick={onSend}
                >
                    <path
                        fillRule='evenodd'
                        d='M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z'
                        clipRule='evenodd'
                    />
                </svg>
            </div>

            {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

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
