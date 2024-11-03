'use client'
import '#root/app/globals.css'

const RootLayout = ({ children }) => {
    return (
        <html>
            <body className='bg-zinc-900 text-white'>{children}</body>
        </html>
    )
}

export default RootLayout
