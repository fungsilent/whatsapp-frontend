import axiosBackend from "#root/utils/axios"

export const signin = async ({ username, password }) => {
    const res = await axiosBackend.post("/user/login", {
        username,
        password,
    })
    if (res.data) {
        const { token, ...user } = res.data
        localStorage.setItem("token", token)
        res.data = user
    }
    return res
}

export const signup = async ({ name, username, password }) => {
    const res = await axiosBackend.post("/user/add", {
        name,
        username,
        password,
    })
    if (res.data) {
        const { token, ...user } = res.data
        localStorage.setItem("token", token)
        res.data = user
    }
    return res
}

export const fetchUserInfo = async () => {
    return await axiosBackend.get("/user/info")
}

export const updateUserInfo = async ({name, password}) => {
    return await axiosBackend.patch("/user/update")
}
