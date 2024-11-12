import { Drawer } from 'flowbite-react'
import { useAppStore } from '#root/app/store'
import Roomlist from './roomlist/Roomlist'
import Profile from './Profile'

const Container = () => {
    const { primarySection, showSection } = useAppStore()

    const onClose = () => {
        showSection(null)
    }

    return (
        <div className='relative w-[400px] overflow-hidden'>
            <Roomlist />
            <Drawer
                open={primarySection}
                onClose={onClose}
                className='absolute right-0 bottom-0 p-0 bg-slate-900'
            >
                {primarySection === 'profile' && <Profile />}
            </Drawer>
        </div>
    )
}

export default Container
