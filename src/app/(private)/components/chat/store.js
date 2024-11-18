import { create } from 'zustand'

export const useChatStore = create(set => ({
    panel: null,
    info: {},
    messages: [],

    resetRoom: () =>
        set({
            panel: null,
            info: {},
            messages: [],
        }),
    setPanel: panel => set({ panel }),
    setInfo: info => set({ info: info ?? {} }),
    setMessages: messages => set({ messages }),
    addMessages: newMessages =>
        set(store => ({
            messages: [...store.messages, ...newMessages],
        })),
}))
