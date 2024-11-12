'use client'
import classNames from 'classnames'
import Link from 'next/link'
import { useAppStore } from '#root/app/store'
import ChatSection from './components/chat/Section'
import Roomlist from './components/roomlist/Roomlist'

const HomePage = () => {
    const { setUser } = useAppStore()

    const logout = () => {
        setUser(null)
    }

    return (
        <div className='flex justify-center items-center h-[100vh] p-6'>
            <div className='flex h-full w-full'>
                <ul className='flex flex-col gap-4 p-4 bg-slate-800'>
                    <button
                        className='rounded-full w-10 aspect-square bg-slate-600 mt-auto cursor-pointer'
                        onClick={() => logout()}
                    ></button>
                </ul>
                <Roomlist />
                <ChatSection />
            </div>
        </div>
    )
}

export default HomePage
