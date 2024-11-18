import axiosBackend from '#root/utils/axios'

export const fetchRoomInfo = async roomId => {
    return await axiosBackend.get(`/room/${roomId}`)
}

export const fetchRoomMessage = async (roomId, { page, perPage }) => {
    return await axiosBackend.get(`/room/${roomId}/message/list`, {
        // params: {
        //     page,
        //     perPage,
        // },
    })
}

export const sendRoomMessage = async (roomId, { message }) => {
    const res = await axiosBackend.post(`/room/${roomId}/message/send`, {
        message,
    })
    if (res.data) {
        res.data = !!res.data
    }
    return res
}
