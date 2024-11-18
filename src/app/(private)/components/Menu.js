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
        <nav className='flex flex-col gap-4 p-4 bg-slate-200 dark:bg-slate-800'>
            <MenuButton onClick={() => showSection(null)}>
                <svg
                    className='w-6 h-6 text-slate-800 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='none'
                    viewBox='0 0 24 24'
                >
                    <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z'
                    />
                </svg>
            </MenuButton>
            <MenuButton onClick={() => showSection('add_friend')}>
                <svg
                    className='w-6 h-6 text-slate-800 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='none'
                    viewBox='0 0 24 24'
                >
                    <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                    />
                </svg>
            </MenuButton>
            <MenuButton onClick={() => showSection('add_group')}>Group</MenuButton>
            <MenuButton
                className='mt-auto'
                onClick={() => logout()}
            >
                <svg
                    className='w-6 h-6 text-slate-800 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
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
            </MenuButton>
            <MenuButton onClick={toggleMode}>
                {mode === 'light' ? (
                    <svg
                        className='w-6 h-6 text-slate-800 dark:text-white'
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
                        className='w-6 h-6 text-slate-800 dark:text-white'
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
            <MenuButton onClick={() => showSection('profile')}>
                <svg
                    className='w-6 h-6 text-slate-800 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='none'
                    viewBox='0 0 24 24'
                >
                    <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                    />
                </svg>
            </MenuButton>
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
