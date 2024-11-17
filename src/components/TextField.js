import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import clsx from 'clsx'

export const useText = (initText, delay) => {
    const [text, setText] = useState(initText)
    const [debounceText] = useDebounce(text, delay)
    return [text, setText, debounceText]
}

const TextField = ({ className, onEnter, onChange, onKeyDown, ...rest }) => {
    const handleKeyDown = event => {
        if (event.key === 'Enter') onEnter()
        if (onKeyDown) onKeyDown(event)
    }

    const handleOnChange = event => {
        onChange(event.target.value)
    }

    return (
        <input
            className={clsx(
                'w-full rounded px-3 py-1 bg-stone-200 dark:bg-slate-600 placeholder-gray-400 outline-none',
                className
            )}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            {...rest}
        />
    )
}

export default TextField
