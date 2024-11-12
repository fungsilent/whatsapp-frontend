import classNames from 'classnames'
import { useAppStore } from '#root/app/store'

const Menu = () => {
    const { setUser, showSection } = useAppStore()

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
            <MenuButton onClick={() => showSection('profile')}>Icon</MenuButton>
        </nav>
    )
}

const MenuButton = ({ className, children, ...props }) => {
    return (
        <button
            type='button'
            className={classNames('rounded-full w-10 aspect-square bg-slate-600 cursor-pointer', className)}
            {...props}
        >
            {children}
        </button>
    )
}

export default Menu
