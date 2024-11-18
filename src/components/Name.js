import clsx from 'clsx'

const Name = ({ children, type, className, ...rest }) => {
    return (
        <span
            className={clsx(
                { 'text-blue-600 dark:text-sky-400': type === 'name' },
                { 'text-gray-400 dark:text-stone-400': type === 'username' },
                className
            )}
            {...rest}
        >
            {children}
        </span>
    )
}

export default Name
