import { useAppStore } from '#root/app/store'

const Chat = () => {
    const { socket } = useAppStore()

    return (
        <div className='flex-1 flex flex-col'>
            <div className='flex gap-4 items-center px-4 py-2 bg-slate-800'>
                <i className={'rounded-full w-12 h-12 aspect-square bg-slate-600'} />
                <div className='flex-1 flex flex-wrap justify-between gap-1'>
                    <p className='w-full text-lg'>+852 6543 7890</p>
                    <p className='text-sm text-slate-400'>向自己傳送訊息</p>
                </div>
            </div>
            <div className='flex-1 bg-slate-950 relative'>
                <i
                    className='absolute w-full h-full left-0 top-0'
                    style={{
                        backgroundRepeat: true,
                        backgroundImage: 'url("https://static.whatsapp.net/rsrc.php/v3/yl/r/gi_DckOUM5a.png")',
                        opacity: 0.1,
                    }}
                />
            </div>
            <div className='flex gap-4 py-2 px-3 bg-slate-800'>
                {[...Array(2)].map((item, index) => (
                    <i
                        key={index}
                        className='rounded-full w-10 h-10 aspect-square bg-slate-600 cursor-pointer'
                    />
                ))}
                <input className='w-full rounded px-3 py-1 bg-slate-600 outline-none' />
            </div>
        </div>
    )
}

export default Chat
