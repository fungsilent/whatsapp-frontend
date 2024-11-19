import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import clsx from 'clsx'
import { overrideTailwindClasses } from 'tailwind-override'

export const useText = (initText, delay) => {
    const [text, setText] = useState(initText)
    const [debounceText] = useDebounce(text, delay)
    return [text, setText, debounceText]
}

const TextField = ({ className, inputClassName, renderLeft, onEnter, onChange, onKeyDown, ...rest }) => {
    const handleKeyDown = event => {
        if (event.key === 'Enter' && onEnter) {
            onEnter(event)
            console.log('enter')
        }
        if (onKeyDown) onKeyDown(event)
    }

    const handleOnChange = event => {
        if (onChange) onChange(event.target.value)
    }

    return (
        <div
            className={overrideTailwindClasses(
                clsx(
                    'flex gap-3 w-full rounded px-3 py-2',
                    'bg-stone-200 dark:bg-slate-600 placeholder-gray-400',
                    className
                )
            )}
        >
            {renderLeft}
            <input
                className={overrideTailwindClasses(
                    clsx(
                        'w-full outline-none bg-transparent placeholder-gray-400',
                        'p-0 border-none border-0 focus:ring-0',
                        inputClassName
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
