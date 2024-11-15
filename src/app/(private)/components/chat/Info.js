import { Avatar } from 'flowbite-react'

const Info = ({ type, name }) => {
    const getSubTitle = () => {
        if (false) {
            return 'Message youself'
        }
        return `Click here for ${type} info`
    }

    return (
        <div className='flex gap-4 items-center px-4 py-2 z-20 bg-stone-200 dark:bg-slate-800'>
            <Avatar
                rounded
                size='md'
                className='mr-auto justify-start cursor-pointer'
            >
                <div className='space-y-1 font-medium'>
                    <div>{name}</div>
                    <div className='text-sm text-gray-500 dark:text-gray-400'>{getSubTitle()}</div>
                </div>
            </Avatar>
            {/* <div className='flex-1 flex flex-wrap justify-between gap-1 cursor-pointer'>
                <p className='w-full text-lg'>{name}</p>
                <p className='text-sm text-stone-600 dark:text-slate-400'>{getSubTitle()}</p>
            </div> */}

            <svg
                className='w-6 h-6 text-gray-800 dark:text-stone-200 cursor-pointer'
                aria-hidden='true'
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
            <svg
                className='w-6 h-6 text-gray-800 dark:text-stone-200 cursor-pointer'
                aria-hidden='true'
                fill='none'
                viewBox='0 0 24 24'
            >
                <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 12h14m-7 7V5'
                />
            </svg>
        </div>
    )
}

export default Info
