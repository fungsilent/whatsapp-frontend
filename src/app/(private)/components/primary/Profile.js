import { useState, useEffect } from 'react'
import PasswordChecklist from 'react-password-checklist'
import Icon from '#root/components/Icon'
import Name from '#root/components/Name'
import { FormField, Button } from '#root/components/Form'
import { useAppStore } from '#root/app/store'
import { updateUserInfo } from '#root/api/user'
import useFetch from '#root/hooks/useFetch'

const Profile = () => {
    const { user, setUser } = useAppStore()
    const [dispatchUpdate, updatedUser, isLoading, error] = useFetch()
    const [formError, setFormError] = useState('')
    const [form, setForm] = useState({
        name: user.name,
        password: '',
        confirmPassword: '',
    })

    useEffect(() => {
        if (updatedUser) {
            setUser(updatedUser)
        }
    }, [updatedUser])

    const doUpdate = () => {
        if (form.password !== form.confirmPassword) {
            return setFormError('Confirm password incorrect')
        }
        dispatchUpdate(() => updateUserInfo(form))
    }

    const onFormChange = (name, value) => {
        if (formError) setFormError('')
        switch (name) {
            case 'username': {
                value = value.toLowerCase()
                break
            }
        }
        setForm({
            ...form,
            [name]: value,
        })
    }

    return (
        <>
            <div className='h-full flex flex-col border-r-[1px] border-stone-300 dark:border-slate-700 overflow-y-auto'>
                <div className='flex items-center px-4 h-[68px] bg-white dark:bg-slate-900'>
                    <p className='mr-auto text-2xl'>
                        <span className='flex items-center h-12'>Profile</span>
                    </p>
                </div>

                <div className='flex-1 flex flex-col gap-6 p-3 bg-white dark:bg-slate-900 overflow-y-auto'>
                    <div className='flex flex-col items-center gap-3 px-4 py-3 mb-3 bg-white dark:bg-slate-900'>
                        <Icon
                            name={form.name}
                            type='friend'
                            className='h-36 w-36'
                            textClassName='text-5xl'
                        />
                    </div>

                    <div>
                        <label className='block mb-2 text-sm font-medium '>Username</label>
                        <Name type='name'>{user.username}</Name>
                    </div>

                    <div>
                        <label className='block mb-2 text-sm font-medium '>Display name</label>
                        <EditField value={form.name}>
                            <FormField
                                name='name'
                                type='text'
                                placeholder='Up to 30 characters'
                                maxLength={30}
                                value={form.name}
                                onChange={value => onFormChange('name', value)}
                            />
                        </EditField>
                    </div>

                    <div>
                        <label className='block mb-2 text-sm font-medium'>Password</label>
                        <EditField value={'********'}>
                            <div className='mb-6'>
                                <FormField
                                    name='password'
                                    type='password'
                                    minLength={8}
                                    maxLength={20}
                                    value={form.password}
                                    onChange={value => onFormChange('password', value)}
                                />
                            </div>
                            <div>
                                <label className='block mb-2 text-sm font-medium'>Confirm password</label>
                                <FormField
                                    name='confirmPassword'
                                    type='password'
                                    minLength={8}
                                    maxLength={20}
                                    value={form.confirmPassword}
                                    onChange={value => onFormChange('confirmPassword', value)}
                                    classNames={{
                                        container: 'mb-2',
                                    }}
                                />
                                <PasswordChecklist
                                    rules={['minLength', 'number', 'letter', 'match']}
                                    minLength={6}
                                    value={form.password}
                                    valueAgain={form.confirmPassword}
                                    messages={{
                                        minLength: 'Minimum 6 characters',
                                        number: 'Has a number',
                                        letter: 'Has a letter',
                                        match: 'Password match',
                                    }}
                                />
                            </div>
                        </EditField>
                    </div>

                    {(!!formError || !!error) && <p className='text-rose-600'>{formError || error}</p>}

                    <Button
                        isLoading={isLoading}
                        text='Save profile'
                        onClick={doUpdate}
                    />
                </div>
            </div>
        </>
    )
}

const EditField = ({ value, children }) => {
    const [isEdit, setEdit] = useState(false)

    const toggleEdit = () => setEdit(state => !state)

    return (
        <>
            <div className='flex'>
                <span className='flex-1'>
                    {!isEdit && <span className='flex items-center h-[42px] truncate'>{value}</span>}
                    {isEdit && children}
                </span>
                <span
                    className='flex items-center ml-3 cursor-pointer h-[42px]'
                    onClick={toggleEdit}
                >
                    {isEdit ? (
                        <svg
                            className='w-6 h-6 text-gray-800 dark:text-stone-200'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M6 18 17.94 6M18 18 6.06 6'
                            />
                        </svg>
                    ) : (
                        <svg
                            className='w-6 h-6 text-gray-800 dark:text-stone-200'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                fillRule='evenodd'
                                d='M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z'
                                clipRule='evenodd'
                            />
                        </svg>
                    )}
                </span>
            </div>
        </>
    )
}

export default Profile
