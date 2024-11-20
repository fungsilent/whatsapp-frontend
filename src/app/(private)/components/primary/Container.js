import { Drawer } from 'flowbite-react'
import clsx from 'clsx'
import { useAppStore } from '#root/app/store'
import RoomList from './RoomList'
import Profile from './Profile'
import AddFriend from './AddFriend'
import AddGroup from './AddGroup'
const Container = () => {
    const { primarySection, showSection } = useAppStore()

    const onClose = () => {
        showSection(null)
    }

    return (
        <div
            className={clsx(
                'relative w-[400px] max-lg:w-[300px] max-md:w-[200px] overflow-hidden',
                'bg-stone-200 dark:bg-slate-800'
            )}
        >
            <RoomList />
            <Drawer
                open={primarySection}
                onClose={onClose}
                className='absolute p-0 bg-slate-900 w-full h-full'
                backdrop={false}
            >
                {primarySection === 'profile' && <Profile />}
                {primarySection === 'add_friend' && <AddFriend />}
                {primarySection === 'add_group' && <AddGroup />}
            </Drawer>
        </div>
    )
}

export default Container
