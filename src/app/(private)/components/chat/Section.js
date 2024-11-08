import Header from './Header'
import Chat from './Chat'
import MessageInput from './MessageInput'

const ChatSection = () => {
    return (
        <section className='flex-1 flex flex-col'>
            <Header />
            <Chat />
            <MessageInput />
        </section>
    )
}

export default ChatSection
