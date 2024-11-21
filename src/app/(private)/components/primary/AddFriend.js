'use client'
import { useEffect } from 'react'
import { Spinner, Popover } from 'flowbite-react'
import clsx from 'clsx'
import SearchField from '#root/components/SearchField'
import Name from '#root/components/Name'
import Icon from '#root/components/Icon'
import useFetch from '#root/hooks/useFetch'
import { useAppStore } from '#root/app/store'
import { useText } from '#root/components/TextField'
import { addFriend, searchUser } from '#root/api/chat'

const AddFriend = () => {
    const [search, setSearch, debounceSearch] = useText('', 300)
    const [dispatchSearch, users, isLoading, error] = useFetch()

    useEffect(() => {
        if (debounceSearch) {
            dispatchSearch(() => searchUser(debounceSearch))
        }
    }, [debounceSearch])

    return (
        <div className='h-full flex flex-col border-r-[1px] border-stone-300 dark:border-slate-700 overflow-y-auto'>
            <div className='flex items-center px-4 h-[68px] bg-white dark:bg-slate-900'>
                <p className='mr-auto text-2xl'>
                    <span className='flex items-center h-12'>Add friend</span>
                </p>
            </div>
            <div className='mb-3 p-3 bg-white dark:bg-slate-900'>
                <SearchField
                    placeholder='Search username'
                    value={search}
                    onChange={value => setSearch(value)}
                />
            </div>
            <div className='flex-1 bg-white dark:bg-slate-900 overflow-y-auto'>
                {!debounceSearch && <p className='py-6 text-sm text-center'>{`Let's make some friends`}</p>}
                {isLoading && (
                    <div className='py-6 text-center'>
                        <Spinner />
                    </div>
                )}
                {debounceSearch && !isLoading && !users?.length && (
                    <p className='py-6 text-sm text-center'>No user found</p>
                )}
                {debounceSearch &&
                    !isLoading &&
                    !!users?.length &&
                    users.map(user => (
                        <User
                            key={user.id}
                            {...user}
                        />
                    ))}
            </div>
        </div>
    )
}

const User = ({ username, name }) => {
    const { setRoom } = useAppStore()
    const [dispatchAdd, data, isLoading, error] = useFetch()

    const add = () => {
        dispatchAdd(() => addFriend({ username }))
    }

    useEffect(() => {
        if (data) {
            setRoom(data.roomId)
        }
    }, [data])

    const hasResult = data !== null
    const err = error || (hasResult && !data.isNew && 'User already be friend')

    return (
        <li className='flex'>
            <div
                className='flex-1 flex items-center hover:bg-slate-100 hover:dark:bg-slate-700 cursor-pointer'
                onClick={add}
            >
                <Icon
                    name={name}
                    type='friend'
                    className='mx-4'
                />
                <div className='flex-1 grid grid-rows-2 grid-cols-[1fr_auto] gap-2 border-b-2 border-b-stone-200 dark:border-b-slate-800 pr-4 py-2'>
                    <Name
                        type='name'
                        className='truncate'
                    >
                        {name}
                    </Name>

                    <span className='flex items-center row-span-2'>
                        {isLoading && <Spinner />}
                        {!isLoading && (
                            <Popover
                                trigger={err && 'hover'}
                                placement='left'
                                content={<p className='py-1 px-2'>{err}</p>}
                            >
                                <svg
                                    className={clsx(
                                        'w-6 h-6 cursor-pointer',
                                        { 'text-gray-500 dark:text-white': !hasResult && !err },
                                        { 'text-emerald-600': hasResult && data.isNew },
                                        { 'text-rose-600': err }
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
                            </Popover>
                        )}
                    </span>
                    <Name
                        type='username'
                        className='truncate'
                    >
                        {name}
                    </Name>
                </div>
            </div>
        </li>
    )
}

export default AddFriend
