import Icon from '#root/components/Icon'
import { useAppStore } from '#root/app/store'
import { panelMap } from './panel/Container'

const Info = () => {
    const { user, info, setPanel } = useAppStore()

    /* Render */
    const getSubTitle = () => {
        // if (false) {
        //     return 'Message youself'
        // }
        if (info.type) {
            return `Click here for ${info.type} info`
        }
        return ''
    }

    const isAdmin = !!info.members?.find(member => member.userId === user.userId)?.isAdmin

    return (
        <div className='flex gap-4 items-center px-4 py-2 h-[68px] z-20 bg-stone-200 dark:bg-slate-800'>
            <div
                className='grid grid-rows-2 grid-cols-[auto_auto] gap-x-4 gap-y-1 items-center mr-auto cursor-pointer'
                onClick={() => setPanel(panelMap.ROOM_DETAIL.key)}
            >
                <Icon
                    name={info.name}
                    type={info.type}
                    className='row-span-2'
                />
                <div className='truncate'>{info.name}</div>
                <div className='text-sm text-gray-500 dark:text-gray-400 truncate'>{getSubTitle()}</div>
            </div>

            <svg
                className='shrink-0 w-6 h-6 text-gray-800 dark:text-stone-200 cursor-pointer'
                aria-hidden='true'
                fill='none'
                viewBox='0 0 24 24'
                onClick={() => setPanel(panelMap.SEARCH_MESSAGE.key)}
            >
                <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeWidth='2'
                    d='m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z'
                />
            </svg>
            {info.type === 'group' && isAdmin && (
                <svg
                    className='shrink-0 w-6 h-6 text-gray-800 dark:text-stone-200 cursor-pointer'
                    aria-hidden='true'
                    fill='none'
                    viewBox='0 0 24 24'
                    onClick={() => setPanel(panelMap.ADD_GROUP_MEMBER.key)}
                >
                    <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5 12h14m-7 7V5'
                    />
                </svg>
            )}
        </div>
    )
}

export default Info
