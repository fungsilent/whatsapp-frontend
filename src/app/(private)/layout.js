'use client'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useAppStore } from '#root/app/store'
import { connectWebSocket } from '#root/api/socket'
import { fetchUserInfo } from '#root/api/user'
import useFetch from '#root/hooks/useFetch'

const PrivateLayout = ({ children }) => {
    const { isAuth, setUser, setSocket } = useAppStore()
    const [dispatchFetch, user, isLoading, error] = useFetch({
        initLoading: true,
        // log: 'fetchUserInfo',
    })

    useEffect(() => {
        dispatchFetch(fetchUserInfo)
        setSocket(connectWebSocket())
    }, [])

    useEffect(() => {
        if (isLoading) return

        if (user) {
            setUser(user)
        } else {
            redirect('/login')
        }
    }, [isLoading])

    return (
        <div id='PrivateLayout'>
            {!isAuth && <div>Loading</div>}
            {isAuth && children}
        </div>
    )
}

export default PrivateLayout
