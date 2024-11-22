import clsx from 'clsx'
import { Spinner } from 'flowbite-react'
import TextField from '#root/components/TextField'

export const FormField = ({ classNames = {}, ...rest }) => {
    return (
        <TextField
            classNames={{
                ...classNames,
                input: clsx(
                    'focus-within:ring-2 focus-within:ring-primary-600 focus-within:border-primary-600',
                    classNames.input
                ),
            }}
            {...rest}
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
                    color='warning'
                    size='sm'
                    className='mr-3'
                />
            )}
            <span>{text}</span>
        </button>
    )
}
