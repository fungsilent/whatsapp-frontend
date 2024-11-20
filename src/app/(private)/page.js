'use client'
import { useAppStore } from '#root/app/store'
import Menu from './components/Menu'
import Primary from './components/primary/Container'
import Chat from './components/chat/Container'

const HomePage = () => {
    const {} = useAppStore()

    return (
        <div className='flex justify-center items-center w-full max-w-[1600px] h-screen m-auto'>
            <div className='flex h-full w-full'>
                <Menu />
                <Primary />
                <Chat />
            </div>
        </div>
    )
}

export default HomePage
