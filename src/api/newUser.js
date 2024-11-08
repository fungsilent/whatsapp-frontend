import axiosBackend from "#root/utils/axios";

export const signUp = async ({ username, name, password }) => {
  return await axiosBackend.post("/user/add", {
    username,
    name,
    password,
  });
};

export const fetchUserInfo = async () => {
  return await axiosBackend.get("/user/info");
};
