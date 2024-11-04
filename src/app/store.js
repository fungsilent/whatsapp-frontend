import { create } from 'zustand'

export const useAppStore = create(set => ({
    user: null,
    isAuth: false,
    socket: null,
    setUser: user =>
        set({
            user: user || null,
            isAuth: !!user,
        }),
    setSocket: socket => set({ socket }),
}))
