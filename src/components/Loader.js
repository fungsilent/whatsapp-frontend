import classNames from 'classnames'

const Loader = ({ full = false }) => {
    return (
        <div
            className={classNames({
                'flex justify-center items-center max-w-[800px] w-full h-[100vh] p-10 m-auto': full,
            })}
        >
            <div className={classNames('loader w-full')}></div>
        </div>
    )
}

export default Loader
