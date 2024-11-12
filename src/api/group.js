import axiosBackend from "#root/utils/axios";

export const createGroup = async () => {
  return await axiosBackend.post("/group/create", {
    username,
  });
};

export const addMember = async () => {
  return await axiosBackend.post("/group/member/add");
};

export const deleteMember = async () => {
  return await axiosBackend.delete("/group/member/remove");
};
