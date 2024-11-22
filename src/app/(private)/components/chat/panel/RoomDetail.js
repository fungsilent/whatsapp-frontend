import moment from 'moment'
import clsx from 'clsx'
import { Spinner, Popover } from 'flowbite-react'
import Icon from '#root/components/Icon'
import Name from '#root/components/Name'
import DeleteConfrim, { useDelete } from '#root/components/DeleteConfrim'
import useFetch from '#root/hooks/useFetch'
import { useAppStore } from '#root/app/store'
import { removeRoom } from '#root/api/room'
import { removeMember } from '#root/api/chat'

const RoomDetail = () => {
    const { roomId, user, info } = useAppStore()

    switch (info.type) {
        case 'friend': {
            return (
                <>
                    <BasicInfo
                        name={info.name}
                        type={info.type}
                    >
                        <Name type='name'>{info.name}</Name> <Name type='username'>{info.username}</Name>
                    </BasicInfo>

                    <RemoveRoom
                        roomId={roomId}
                        type={info.type}
                    />
                </>
            )
        }
        case 'group': {
            const date = moment(info.date)
            const isAdmin = info.members.find(member => member.userId === user.userId)?.isAdmin
            return (
                <>
                    <BasicInfo
                        name={info.name}
                        type={info.type}
                    >
                        <p className='text-xl'>{info.name}</p>
                    </BasicInfo>

                    <div className='flex flex-col gap-3 px-4 py-3 mb-3 bg-white dark:bg-slate-900'>
                        <p className=''>
                            {'Group created by '}
                            <Name type='name'>{info.createdBy.name}</Name>{' '}
                            <Name type='username'>{info.createdBy.username}</Name>
                            {' , on '}
                            <span>{date.format('DD/MM/YYYY')}</span>
                            {' at '}
                            <span>{date.format('HH:mm')}</span>
                        </p>
                    </div>

                    <div className='flex flex-col mb-3 bg-white dark:bg-slate-900'>
                        <p className='p-3'>{info.membersCount} members</p>
                        {info.members.map(member => (
                            <Member
                                key={member.userId}
                                roomId={roomId}
                                {...member}
                                hasAdmin={member.isAdmin}
                                isAdmin={isAdmin}
                            />
                        ))}
                    </div>

                    <RemoveRoom
                        roomId={roomId}
                        type={info.type}
                    />
                </>
            )
        }
    }
}

const BasicInfo = ({ name, type, children }) => {
    return (
        <div className='flex flex-col items-center gap-3 px-4 py-3 mb-3 bg-white dark:bg-slate-900'>
            <Icon
                name={name}
                type={type}
                className='h-36 w-36'
                textClassName='text-5xl'
            />
            {children}
        </div>
    )
}

const RemoveRoom = ({ roomId, type }) => {
    const [dispatchRemove, isRemoved, isLoading, error] = useFetch()
    const { onOpen, ...removeConfrimProps } = useDelete()

    const onConfirm = () => {
        if (isLoading) return
        dispatchRemove(() => removeRoom(roomId))
    }

    /* render */
    const renderIcon = () => {
        if (type === 'friend') {
            return (
                <svg
                    className='shrink-0 w-6 h-6 text-rose-600'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                >
                    <path
                        fillRule='evenodd'
                        d='M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z'
                        clipRule='evenodd'
                    />
                </svg>
            )
        } else {
            return (
                <svg
                    className='shrink-0 w-6 h-6 text-rose-600'
                    fill='none'
                    viewBox='0 0 24 24'
                >
                    <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2'
                    />
                </svg>
            )
        }
    }

    const label = type === 'friend' ? 'Remove chat' : 'Exit group'

    return (
        <div className='flex-1 flex flex-col gap-3 bg-white dark:bg-slate-900'>
            <div
                className='flex gap-3 px-4 py-3 items-center cursor-pointer'
                onClick={onOpen}
            >
                {renderIcon()}
                <span className='text-rose-600'>{label}</span>
                <span className='ml-auto'>
                    {isLoading && <Spinner />}
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
                                    d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </Popover>
                    )}
                </span>
            </div>
            <DeleteConfrim
                {...removeConfrimProps}
                text={`Are you sure you want to ${label.toLowerCase()}?`}
                onConfirm={onConfirm}
            />
        </div>
    )
}

const Member = ({ roomId, name, username, hasAdmin, isAdmin }) => {
    const [dispatchRemove, isRemoved, isLoading, error] = useFetch()

    const onRemove = () => {
        if (isLoading) return
        dispatchRemove(() =>
            removeMember({
                roomId,
                username,
            })
        )
    }

    return (
        <div className='flex gap-4 px-4 py-3 items-center border-b-2 border-b-stone-200 dark:border-b-slate-800 hover:bg-slate-100 hover:dark:bg-slate-700'>
            <Icon
                name={name}
                type='friend'
            />
            <div className='flex flex-col gap-1'>
                <Name type='name'>{name}</Name>
                <Name type='username'>{username}</Name>
            </div>
            {hasAdmin && <span className='text-xs p-1 bg-blue-200 text-blue-800 rounded-md'>Admin</span>}
            {isAdmin && (
                <span
                    className='ml-auto cursor-pointer'
                    onClick={onRemove}
                >
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
                                    { 'text-gray-500 dark:text-white': !error },
                                    { 'text-rose-600': error }
                                )}
                                fill='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M5 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-2 9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Zm13-6a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4Z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </Popover>
                    )}
                </span>
            )}
        </div>
    )
}

export default RoomDetail
