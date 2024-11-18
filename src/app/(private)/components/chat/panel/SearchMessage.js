import { useEffect, useState } from 'react'
import moment from 'moment'
import TextField, { useText } from '#root/components/TextField'
import Name from '#root/components/Name'
import { useAppStore } from '#root/app/store'

const SearchMessage = () => {
    const { info, messages } = useAppStore()
    const [search, setSearch, debounceSearch] = useText('', 300)
    const [list, setList] = useState([])

    useEffect(() => {
        if (debounceSearch) {
            const result = messages.filter(message => message.content.includes(debounceSearch))
            setList(result)
        }
    }, [debounceSearch])

    const renderList = () => {
        if (!list.length) {
            return <p className='py-6 text-sm text-center'>No messages found</p>
        }
        return list.map(({ date, content, user }, index) => (
            <div
                key={index}
                className='p-3 border-b-2 border-b-stone-200 dark:border-b-slate-800 hover:bg-slate-100 hover:dark:bg-slate-700 cursor-pointer'
            >
                <p className='flex gap-3 items-center text-sm'>
                    <Name type='name'>{user.name}</Name>
                    <Name type='username'>{user.username}</Name>
                    <span className='ml-auto text-xs text-gray-600 dark:text-gray-400'>
                        {moment(date).format('DD/MM/YYYY HH:mm')}
                    </span>
                </p>
                <p>{content}</p>
            </div>
        ))
    }

    return (
        <>
            <div className='p-3 mb-3 bg-white dark:bg-slate-900'>
                <TextField
                    placeholder='Search'
                    value={search}
                    onChange={value => setSearch(value)}
                />
            </div>
            <div className='flex-1 bg-white dark:bg-slate-900 overflow-y-auto'>
                {!debounceSearch && <p className='py-6 text-sm text-center'>Search for messages within {info.name}</p>}
                {debounceSearch && renderList()}
            </div>
        </>
    )
}

export default SearchMessage
