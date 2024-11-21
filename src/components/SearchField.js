import clsx from 'clsx'
import TextField from '#root/components/TextField'

const SearchField = ({ classNames = {}, ...rest }) => {
    return (
        <TextField
            renderLeft={() => (
                <svg
                    className='shrink-0 w-6 h-6 text-gray-800 dark:text-stone-200'
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
            )}
            {...rest}
            classNames={{
                ...classNames,
                input: clsx('pl-12', classNames.input),
            }}
        />
    )
}

export default SearchField
