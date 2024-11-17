import Image from 'next/image'

const NotFound = () => {
    return (
        <section className='flex-1 flex justify-center items-center bg-blue-200 dark:bg-slate-950'>
            <Image
                src='chat-not-found.svg'
                width={500}
                height={500}
                alt='chat-not-found'
            />
        </section>
    )
}

export default NotFound
