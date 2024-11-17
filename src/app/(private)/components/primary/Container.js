import { Drawer } from 'flowbite-react'
import { useAppStore } from '#root/app/store'
import FriendList from './FriendList'
import Profile from './Profile'

const Container = () => {
    const { primarySection, showSection } = useAppStore()

    const onClose = () => {
        showSection(null)
    }

    return (
        <div className='relative w-[400px] overflow-hidden'>
            <FriendList />
            <Drawer
                open={primarySection}
                onClose={onClose}
                className='absolute p-0 bg-slate-900 w-full h-full'
                backdrop={false}
            >
                {primarySection === 'profile' && <Profile />}
            </Drawer>
        </div>
    )
}

export default Container
