import { useEffect } from 'react'
import clsx from 'clsx'
import { Spinner, Popover } from 'flowbite-react'
import { useText } from '#root/components/TextField'
import SearchField from '#root/components/SearchField'
import Icon from '#root/components/Icon'
import Name from '#root/components/Name'
import useFetch from '#root/hooks/useFetch'
import { searchUser, addMember } from '#root/api/chat'

const AddGroupMember = ({ roomId }) => {
    const [search, setSearch, debounceSearch] = useText('', 300)
    const [dispatchSearch, users, isLoading, error] = useFetch()

    useEffect(() => {
        if (debounceSearch) {
            dispatchSearch(() => searchUser(debounceSearch))
        }
    }, [debounceSearch])

    return (
        <>
            <div className='p-3 mb-3 bg-white dark:bg-slate-900'>
                <SearchField
                    placeholder='Search username'
                    value={search}
                    onChange={value => setSearch(value)}
                />
            </div>
            <div className='flex-1 bg-white dark:bg-slate-900 overflow-y-auto'>
                {!debounceSearch && <p className='py-6 text-sm text-center'>Add member</p>}
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
                        <AddMember
                            key={user.id}
                            roomId={roomId}
                            {...user}
                        />
                    ))}
            </div>
        </>
    )
}

const AddMember = ({ roomId, name, username }) => {
    const [dispatchAdd, isAdd, isLoading, error] = useFetch()

    const onAdd = () => {
        dispatchAdd(() =>
            addMember({
                roomId,
                username,
            })
        )
    }

    return (
        <div
            className='flex gap-4 px-4 py-3 items-center border-b-2 border-b-stone-200 dark:border-b-slate-800 hover:bg-slate-100 hover:dark:bg-slate-700 cursor-pointer'
            onClick={onAdd}
        >
            <Icon
                name={name}
                type='friend'
            />
            <div className='flex flex-col gap-1'>
                <Name type='name'>{name}</Name>
                <Name type='username'>{username}</Name>
            </div>
            <span className='ml-auto text-xs'>
                {isLoading && <Spinner />}
                {!isLoading && (
                    <Popover
                        trigger={error && 'hover'}
                        placement='left'
                        content={<p className='py-1 px-2'>{error}</p>}
                    >
                        <svg
                            className={clsx(
                                'w-6 h-6',
                                { 'text-gray-500 dark:text-white': !error && !isAdd },
                                { 'text-emerald-600': isAdd },
                                { 'text-rose-600': error }
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
        </div>
    )
}

export default AddGroupMember
