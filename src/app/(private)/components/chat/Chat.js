import { useState, useEffect } from 'react'
import moment from 'moment'
import { Avatar } from 'flowbite-react'
import { useAppStore } from '#root/app/store'
import useFetch from '#root/hooks/useFetch'
import { fetchRoomMessage } from '#root/api/room'

const Chat = ({ roomId }) => {
    const [dataset, setDataset] = useState([])
    const [dispatchMessage, messages, isLoading, error] = useFetch({ log: 'fetchRoomMessage' })
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
        console.log('diff', messages)
        if (!messages) return

        // const newDataset = messages.reduce((set, message) => {
        //     const date = moment(message.date).local()

        //     dateFlag = date.format('DD/MM/YYYY') === dateFlag ? dateFlag :
        //     set[key] = set[key] || []
        //     set[key].push({
        //         ...message,
        //         time: date.format('HH:mm'),
        //     })
        //     return set
        // }, [])
        setDataset([...dataset, ...messages])
    }, [isLoading])

    return (
        <div className='flex-1 bg-slate-950 relative overflow-y-auto'>
            <i
                className='absolute w-full h-full left-0 top-0'
                style={{
                    backgroundRepeat: true,
                    backgroundImage: 'url("https://static.whatsapp.net/rsrc.php/v3/yl/r/gi_DckOUM5a.png")',
                    opacity: 0.1,
                }}
            />
            {dataset.map((message, index) => (
                <Message
                    key={index}
                    {...message}
                />
            ))}
        </div>
    )
}

const Message = props => {
    // console.log('props', props)
    // const { content, time } = props
    return (
        <div>
            <Avatar
                rounded
                size='md'
                className='mr-auto justify-start'
            >
                <div className='space-y-1 font-medium'>
                    <span>{props.content}</span>
                </div>
            </Avatar>
        </div>
    )
}

export default Chat
