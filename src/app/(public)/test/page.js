'use client'
import { useState } from 'react'

const TestPage = () => {
    const [time, setTime] = useState(Math.random())
    console.log(time)
    return (
        <div>
            <h1>當前時間: {time}</h1>
        </div>
    )
}

export default TestPage
