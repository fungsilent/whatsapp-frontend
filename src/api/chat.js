import axiosBackend from '#root/utils/axios'

/* friend */
export const searchUser = async username => {
    return await axiosBackend.get(`/friend/search/${username}`)
}

export const addFriend = async ({ username }) => {
    return await axiosBackend.post('/friend/add', {
        username,
    })
}

/* group */
export const createGroup = async ({ name }) => {
    return await axiosBackend.post('/group/create', {
        name,
    })
}

export const addMember = async ({ roomId, username }) => {
    const res = await axiosBackend.post('/group/member/add', {
        roomId,
        username,
    })
    if (res.data) {
        res.data = !!res.data
    }
    return res
}

export const removeMember = async ({ roomId, username }) => {
    return await axiosBackend.delete('/group/member/remove', {
        data: {
            roomId,
            username,
        },
    })
}
