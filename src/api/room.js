import axiosBackend from '#root/utils/axios'

export const fetchRoomInfo = async roomId => {
    return await axiosBackend.get(`/room/${roomId}`)
}

export const fetchRoomMessage = async (roomId, { page, perPage }) => {
    return await axiosBackend.get(`/room/${roomId}/message`, {
        params: {
            page,
            perPage,
        },
    })
}
