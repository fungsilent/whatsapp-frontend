'use client'
import { useState } from 'react'
import Link from 'next/link'

const TestPage = () => {
    const [time, setTime] = useState(Math.random())
    console.log(time)
    return (
        <div>
            <h1>當前時間: {time}</h1>
            <Link href='/'>Home</Link>
            <Link href='/login'>login</Link>
        </div>
    )
}

export default TestPage
