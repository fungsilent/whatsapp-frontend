'use client'
import { useState, useEffect } from 'react'
import Icon from '#root/components/Icon'
import useFetch from '#root/hooks/useFetch'
import { createGroup } from '#root/api/chat'
import { FormField, Button } from '#root/components/Form'
import { useAppStore } from '#root/app/store'

const AddGroup = () => {
    const { setRoom } = useAppStore()
    const [dispatchAdd, group, isLoading, error] = useFetch()
    const [newGroup, setNewGroup] = useState({
        name: '',
    })

    useEffect(() => {
        if (group?.roomId) {
            setRoom(group.roomId)
        }
    }, [group])

    const onFormChange = (name, value) => {
        setNewGroup(form => ({
            ...form,
            [name]: value,
        }))
    }

    const onCreate = () => {
        dispatchAdd(() => createGroup(newGroup))
    }

    return (
        <div className='h-full flex flex-col border-r-[1px] border-stone-300 dark:border-slate-700 overflow-y-auto'>
            <div className='flex items-center px-4 h-[68px] bg-white dark:bg-slate-900'>
                <p className='mr-auto text-2xl'>
                    <span className='flex items-center h-12'>Create group</span>
                </p>
            </div>
            <div className='mb-3 p-3 bg-white dark:bg-slate-900'>Your New Friends Await!</div>

            <form className='flex-1 flex flex-col gap-6 p-3 bg-white dark:bg-slate-900 overflow-y-auto'>
                <div className='flex flex-col items-center gap-3 px-4 py-3 mb-3 bg-white dark:bg-slate-900'>
                    <Icon
                        name={newGroup.name}
                        type='group'
                        className='h-36 w-36'
                        textClassName='text-5xl'
                    />
                </div>

                <div>
                    <label className='block mb-2 text-sm font-medium '>Name</label>
                    <FormField
                        name='name'
                        type='text'
                        placeholder='Up to 30 characters'
                        maxLength={30}
                        value={newGroup.name}
                        onChange={value => onFormChange('name', value)}
                    />
                </div>

                <Button
                    isLoading={isLoading}
                    text='Create'
                    onClick={onCreate}
                />

                {error && <p className='text-rose-600'>{error}</p>}
            </form>
        </div>
    )
}

export default AddGroup
