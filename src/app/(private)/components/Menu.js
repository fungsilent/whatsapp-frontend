import clsx from 'clsx'
import { useThemeMode } from 'flowbite-react'
import { useAppStore } from '#root/app/store'

const Menu = () => {
    const { setUser, showSection } = useAppStore()
    const { mode, toggleMode } = useThemeMode()

    const logout = () => {
        setUser(null)
    }

    return (
        <nav className='flex flex-col gap-4 p-4 bg-slate-800'>
            <MenuButton onClick={() => showSection(null)}>FD</MenuButton>
            <MenuButton onClick={() => showSection('add_friend')}>Add</MenuButton>
            <MenuButton
                className='mt-auto'
                onClick={() => logout()}
            >
                Bye
            </MenuButton>
            <MenuButton onClick={toggleMode}>
                {mode === 'light' ? (
                    <svg
                        className='w-6 h-6 text-gray-800 dark:text-white'
                        aria-hidden='true'
                        width='24'
                        height='24'
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
                        className='w-6 h-6 text-gray-800 dark:text-white'
                        aria-hidden='true'
                        width='24'
                        height='24'
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
            </MenuButton>
            <MenuButton onClick={() => showSection('profile')}>Icon</MenuButton>
        </nav>
    )
}

const MenuButton = ({ className, children, ...props }) => {
    return (
        <button
            type='button'
            className={clsx(
                'flex justify-center items-center rounded-full w-10 aspect-square bg-slate-600 cursor-pointer',
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export default Menu
