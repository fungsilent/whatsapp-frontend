import { useEffect } from 'react'
import { Spinner } from 'flowbite-react'
import TextField, { useText } from '#root/components/TextField'
import useFetch from '#root/hooks/useFetch'
import { sendRoomMessage } from '#root/api/room'

const MessageInput = ({ roomId, info: { isDisable } }) => {
    const [message, setMessage] = useText('', 300)
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

    return (
        <div className='flex gap-4 py-2 px-3 z-20 bg-stone-200 dark:bg-slate-800'>
            {/* {[...Array(2)].map((item, index) => (
                <i
                    key={index}
                    className='rounded-full w-10 h-10 aspect-square bg-slate-600 cursor-pointer'
                />
            ))} */}
            <TextField
                className='bg-white dark:bg-slate-600'
                placeholder={isDisable ? 'Chat closed' : 'Type a message'}
                value={message}
                onChange={value => setMessage(value)}
                onEnter={onEnter}
                disabled={isDisable || isLoading}
                renderLeft={isLoading && <Spinner className='dark:text-slate-700' />}
            />
        </div>
    )
}

export default MessageInput
