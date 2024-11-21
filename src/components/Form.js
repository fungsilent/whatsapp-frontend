import clsx from 'clsx'
import { Spinner } from 'flowbite-react'
import TextField from '#root/components/TextField'

export const FormField = ({ className, ...props }) => {
    return (
        <TextField
            className={
                (clsx('focus-within:ring-2 focus-within:ring-primary-600 focus-within:border-primary-600'), className)
            }
            {...props}
        />
    )
}

export const Button = ({ isLoading, onClick, text }) => {
    return (
        <button
            type='button'
            onClick={onClick}
            className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
        >
            {isLoading && (
                <Spinner
                    size='sm'
                    className='mr-3'
                />
            )}
            <span>{text}</span>
        </button>
    )
}
