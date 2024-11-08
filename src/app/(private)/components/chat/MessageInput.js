const MessageInput = () => {
    return (
        <div className='flex gap-4 py-2 px-3 bg-slate-800'>
            {[...Array(2)].map((item, index) => (
                <i
                    key={index}
                    className='rounded-full w-10 h-10 aspect-square bg-slate-600 cursor-pointer'
                />
            ))}
            <input className='w-full rounded px-3 py-1 bg-slate-600 outline-none' />
        </div>
    )
}

export default MessageInput
