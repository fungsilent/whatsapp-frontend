import axiosBackend from '#root/utils/axios'

export const createGroup = async name => {
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
