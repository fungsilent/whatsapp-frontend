import axiosBackend from "#root/utils/axios";

export const addFriend = async ({ username }) => {
  try {
    return await axiosBackend.post("/friend/add", {
      username,
    });
  } catch (err) {
    console.log(err);
  }
};

export const chatlist = async () => {
  return await axiosBackend.get("/friend/list");
};

export const searchUser = async (username) => {
  console.log(username);
  return await axiosBackend.get(`/friend/search/${username}`);
};

export const removeRoom = async (roomId) => {
  console.log("room", roomId);
  return await axiosBackend.delete("/friend/remove", {
    data: { roomId },
  });
};
