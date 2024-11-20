import clsx from 'clsx'

const Loader = ({ full = false }) => {
    return (
        <div
            className={clsx({
                'flex justify-center items-center max-w-[800px] w-full h-[100vh] p-10 m-auto': full,
            })}
        >
            <div className='loader'></div>
        </div>
    )
}

export default Loader
