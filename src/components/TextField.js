import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import clsx from 'clsx'
import { overrideTailwindClasses } from 'tailwind-override'

export const useText = (initText, delay) => {
    const [text, setText] = useState(initText)
    const [debounceText] = useDebounce(text, delay)
    return [text, setText, debounceText]
}

const TextField = ({ classNames = {}, renderLeft, onEnter, onChange, onKeyDown, ...rest }) => {
    const handleKeyDown = event => {
        if (event.key === 'Enter' && onEnter) {
            event.preventDefault()
            onEnter(event)
        }
        if (onKeyDown) onKeyDown(event)
    }

    const handleOnChange = event => {
        if (onChange) onChange(event.target.value)
    }

    return (
        <div className={clsx('relative', classNames.container)}>
            <div className={clsx('absolute top-1/2 left-3 translate-y-[-50%]', classNames.left)}>
                {renderLeft && renderLeft()}
            </div>
            <input
                className={overrideTailwindClasses(
                    clsx(
                        'w-full outline-none rounded border px-3 py-2',
                        'placeholder-gray-400',
                        'border-stone-200 dark:border-slate-600',
                        'bg-stone-200 dark:bg-slate-600',
                        classNames.input
                    )
                )}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                {...rest}
            />
        </div>
    )
}

export default TextField
