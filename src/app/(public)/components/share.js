import clsx from 'clsx'
import { useThemeMode, Spinner } from 'flowbite-react'
import TextField from '#root/components/TextField'

export const Card = ({ children }) => {
    return (
        <div
            className={clsx(
                'w-full sm:max-w-md rounded-lg shadow border',
                'p-6 sm:p-8',
                'bg-white dark:bg-slate-900 border-stone-300 dark:border-slate-700'
            )}
        >
            {children}
        </div>
    )
}

export const Title = ({ title }) => {
    const { mode, toggleMode } = useThemeMode()

    return (
        <div className='flex justify-between items-center mb-6'>
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>{title}</h1>
            <span
                className='cursor-pointer'
                onClick={toggleMode}
            >
                {mode === 'light' ? (
                    <svg
                        className='w-6 h-6 text-gray-600 dark:text-white'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            fillRule='evenodd'
                            d='M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z'
                            clipRule='evenodd'
                        />
                    </svg>
                ) : (
                    <svg
                        className='w-6 h-6 text-gray-600 dark:text-white'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            fillRule='evenodd'
                            d='M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z'
                            clipRule='evenodd'
                        />
                    </svg>
                )}
            </span>
        </div>
    )
}

export const FormField = ({ className, ...props }) => {
    return (
        <TextField
            className={clsx(
                'py-2',
                'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                className
            )}
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
