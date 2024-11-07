const Chat = () => {
    // const [appStore, setAppStore] = useAppContext()
    return (
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
    )
}

export default Chat
