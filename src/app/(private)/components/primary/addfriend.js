'use client'
import { addFriend, searchUser } from '#root/api/chat'
import useFetch from '#root/hooks/useFetch'
import { useState } from 'react'
import Name from '#root/components/Name'
import clsx from 'clsx'
import { Avatar, Spinner, Popover, Modal } from 'flowbite-react'

function NewFriend() {
    const [userlist, setUserlist] = useState([])
    const [newUsername, setNewUsername] = useState('')

    const handleChange = event => {
        setNewUsername(event.target.value)
        console.log(newUsername)
    }

    const search = async newUsername => {
        const data = await searchUser(newUsername)
        setUserlist(data.data)
    }

    console.log(userlist)
    return (
        <div>
            <p className='py-2 px-4 text-2xl'>Search</p>
            <div>
                <div className='flex content-center ml-4 '>
                    <input
                        className="w-75% rounded px-3 py-1 bg-stone-200 dark:bg-slate-600 placeholder-gray-400 outline-none',"
                        onChange={handleChange}
                        placeholder='Insert friend username'
                    ></input>

                    <button onClick={() => search(newUsername)}>
                        {' '}
                        <svg
                            className='w-8 h-8 ml-4 text-gray-800 dark:text-white'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeWidth='2'
                                d='m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z'
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className='m-4  border-t-2 p-2'>
                {userlist.map((user, index) => (
                    <Addfriend
                        key={index}
                        user={user}
                    />
                ))}
            </div>
        </div>
    )
}

const Addfriend = ({ user, index }) => {
    const [dispatchAdd, isAdd, isLoading, error] = useFetch()

    const add = async username => {
        dispatchAdd(() => addFriend({ username }))
        console.log(username, ' added')
    }

    return (
        <div
            className='flex flex-col  border-b-2  	'
            key={index}
        >
            <Name type='name'>{user.name}</Name>
            <Name type='username'>{user.username}</Name>

            <span className=' text-xs'>
                {isLoading && <Spinner />}
                {!isLoading && !error && (
                    <svg
                        onClick={() => add(user.username)}
                        className={clsx(
                            'w-6 h-6 cursor-pointer',
                            { 'text-gray-500 dark:text-white': !isAdd },
                            { 'text-emerald-600': isAdd }
                        )}
                        fill='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            fillRule='evenodd'
                            d='M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z'
                            clipRule='evenodd'
                        />
                    </svg>
                )}
                {error && (
                    <Popover
                        trigger='hover'
                        placement='left'
                        content={<p className='py-1 px-2'>{error}</p>}
                    >
                        <svg
                            className='w-6 h-6 text-rose-600'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                fillRule='evenodd'
                                d='M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </Popover>
                )}
            </span>
        </div>
    )
}

export default NewFriend
