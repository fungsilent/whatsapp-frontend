import axiosBackend from "#root/utils/axios";

export const createGroup = async (username) => {
  return await axiosBackend.post("/group/create", {
    username,
  });
};

export const addMember = async (username, roomId) => {
  return await axiosBackend.post("/group/member/add", {
    username,
    roomId,
  });
};

export const deleteMember = async (username, roomId) => {
  return await axiosBackend.delete("/group/member/remove");
};
