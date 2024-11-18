import { useEffect } from 'react'
import TextField, { useText } from '#root/components/TextField'
import useFetch from '#root/hooks/useFetch'
import { sendRoomMessage } from '#root/api/room'

const MessageInput = ({ roomId, info }) => {
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
                placeholder={info.isDisable ? 'Chat closed' : 'Type a message'}
                value={message}
                onChange={value => setMessage(value)}
                onEnter={onEnter}
                disabled={info.isDisable}
            />
        </div>
    )
}

export default MessageInput
