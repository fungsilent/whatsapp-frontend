'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { useAppStore } from '#root/app/store'
import Menu from './components/Menu'
import Primary from './components/primary/Container'
import ChatSection from './components/chat/Section'

const HomePage = () => {
    const {} = useAppStore()

    return (
        <div className='flex justify-center items-center w-full max-w-[1600px] h-[100vh] m-auto p-6'>
            <div className='flex h-full w-full'>
                <Menu />
                <Primary />
                <ChatSection />
            </div>
        </div>
    )
}

export default HomePage
