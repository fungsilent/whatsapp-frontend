'use client'

import Header from '#root/app/(private)/post/components/Header'
import Footer from '#root/app/(private)/post/components/Footer'
import '#root/app/globals.css'

const RootLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default RootLayout
