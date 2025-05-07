import apiInstance from "@/utils/axios";


let token = localStorage.getItem("token");
export const getUser = async () => {
  console.log("token ",token)
  const response = await apiInstance.get("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getPublicProfile = async (userId) => {
  const response = await apiInstance.get(`/user/profile/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProfile = async (formData) => {
  console.log(token)
  const response = await apiInstance.put("/user/update", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateCoverImage = async (formData) => {
  const response = await apiInstance.put("/user/update/coverImg", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
