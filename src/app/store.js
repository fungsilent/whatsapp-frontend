import { create } from 'zustand'

export const useAppStore = create(set => ({
    // main
    user: null,
    isAuth: false,
    socket: null,
    primarySection: '',
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

    // chat
    roomId: '',
    panel: null,
    info: {},
    messages: [],

    resetRoom: () =>
        set({
            roomId: '',
            panel: null,
            info: {},
            messages: [],
        }),
    setRoom: roomId => set({ roomId }),
    setPanel: panel => set({ panel }),
    setInfo: info => set({ info: info ?? {} }),
    setMessages: messages => set({ messages }),
    addMessages: newMessages =>
        set(store => ({
            messages: [...store.messages, ...newMessages],
        })),
}))
