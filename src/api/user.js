import axiosBackend from "#root/utils/axios";

export const signin = async ({ username, password }) => {
  const res = await axiosBackend.post("/user/login", {
    username,
    password,
  });
  if (!res.ok) {
    return res;
  }
  const { token, ...user } = res.data;
  localStorage.setItem("token", token);
  return {
    ...res,
    data: user,
  };
};

export const fetchUserInfo = async () => {
  return await axiosBackend.get("/user/info");
};
