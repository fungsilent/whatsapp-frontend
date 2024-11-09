import axiosBackend from "#root/utils/axios";

export const signin = async ({ username, password }) => {
    const res = await axiosBackend.post("/user/login", {
        username,
        password,
    });
    const token = res.data?.token;
    if (token) {
        localStorage.setItem("token", token);
    }
    return res;
};

export const signup = async ({ name, username, password }) => {
    const res = await axiosBackend.post("/user/add", {
        name,
        username,
        password,
    });
    const token = res.data?.token;
    if (token) {
        localStorage.setItem("token", token);
    }
    return res;
};

export const fetchUserInfo = async () => {
    return await axiosBackend.get("/user/info");
};
