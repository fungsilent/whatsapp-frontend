import { create } from 'zustand'

export const useAppStore = create(set => ({
    user: null,
    isAuth: false,
    socket: null,
    primarySection: 'profile',

    setUser: user => {
        const isAuth = !!user
        set({
            user: isAuth ? user : null,
            isAuth,
        })
        if (!isAuth) {
            localStorage.removeItem('token')
        }
    },
    setSocket: socket => set({ socket }),
    showSection: section => set({ primarySection: section }),
}))
