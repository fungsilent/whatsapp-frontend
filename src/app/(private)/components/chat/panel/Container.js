import clsx from 'clsx'
import SearchMessage from './SearchMessage'
import AddGroupMember from './AddGroupMember'
import RoomDetail from './RoomDetail'

export const panelMap = {
    ROOM_DETAIL: {
        key: 'ROOM_DETAIL',
        title: 'Info',
    },
    SEARCH_MESSAGE: {
        key: 'SEARCH_MESSAGE',
        title: 'Search messages',
    },
    ADD_GROUP_MEMBER: {
        key: 'ADD_GROUP_MEMBER',
        title: 'Add group member',
    },
}

const PanelContainer = ({ roomId, width, panel, setPanel }) => {
    return (
        <div
            className={clsx(
                'h-full flex flex-col z-20 bg-stone-200 dark:bg-slate-800 border-l-[1px] border-stone-300 dark:border-slate-700 overflow-y-auto'
            )}
            style={{
                width: `${width}px`,
            }}
        >
            <div className='flex gap-4 items-center px-4 py-2 bg-white dark:bg-slate-900'>
                <svg
                    className='w-6 h-12 text-gray-800 dark:text-white cursor-pointer'
                    aria-hidden='true'
                    fill='none'
                    viewBox='0 0 24 24'
                    onClick={() => setPanel(null)}
                >
                    <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M6 18 17.94 6M18 18 6.06 6'
                    />
                </svg>
                <p>{panelMap[panel]?.title}</p>
            </div>
            {panel === panelMap.ROOM_DETAIL.key && <RoomDetail roomId={roomId} />}
            {panel === panelMap.SEARCH_MESSAGE.key && <SearchMessage />}
            {panel === panelMap.ADD_GROUP_MEMBER.key && <AddGroupMember roomId={roomId} />}
        </div>
    )
}

export default PanelContainer
