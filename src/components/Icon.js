import clsx from 'clsx'
import { overrideTailwindClasses } from 'tailwind-override'

const Icon = ({ className, textClassName, name = '', type = null }) => {
    return (
        <div className={overrideTailwindClasses(clsx('w-10 h-10', className))}>
            <div
                className={overrideTailwindClasses(
                    clsx(
                        'w-full h-full inline-flex items-center justify-center overflow-hidden rounded-full',
                        'bg-gray-100',
                        { 'bg-indigo-500': type === 'friend' },
                        { 'bg-fuchsia-500	': type === 'group' }
                    )
                )}
            >
                <span className={overrideTailwindClasses(clsx('font-extrabold text-gray-300 text-md', textClassName))}>
                    {name.substring(0, 2)}
                </span>
            </div>
        </div>
    )
}

export default Icon
