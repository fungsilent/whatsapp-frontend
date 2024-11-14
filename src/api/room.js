import axiosBackend from '#root/utils/axios'

export const fetchRoomInfo = async roomId => {
    return await axiosBackend.get(`/room/${roomId}`)
}
