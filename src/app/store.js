import { create } from 'zustand'

export const useAppStore = create(set => ({
    user: null,
    isAuth: false,
    setUser: user =>
        set({
            user: user || null,
            isAuth: !!user,
        }),
}))
