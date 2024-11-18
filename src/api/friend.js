import axiosBackend from '#root/utils/axios'

export const addFriend = async ({ username }) => {
    try {
        return await axiosBackend.post('/friend/add', {
            username,
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchFriends = async () => {
    return await axiosBackend.get('/chat/list')
}

export const searchUser = async username => {
    return await axiosBackend.get(`/friend/search/${username}`)
}

export const removeFriend = async roomId => {
    return await axiosBackend.delete('/room/remove', {
        data: {
            roomId,
        },
    })
}
export const chatlist = async () => {
    return await axiosBackend.get('/chat/list')
}
