'use client'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useAppStore } from '#root/app/store'
import { fetchUserInfo } from '#root/api/user'
import useFetch from '#root/hooks/useFetch'

const PrivateLayout = ({ children }) => {
    const { isAuth, setUser } = useAppStore()
    const [dispatchFetch, user, isLoading, error] = useFetch({ initLoading: true, log: 'fetchUserInfo' })

    useEffect(() => {
        dispatchFetch(fetchUserInfo)
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
            {!isAuth && 'Loading'}
            {isAuth && children}
        </div>
    )
}

export default PrivateLayout
