import apiInstance from "@/utils/axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");

export const createPost = async (formData) => {
  try {
    const response = await apiInstance.post("/post/create", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const getAllPosts = async () => {
  const response = await apiInstance.get("/post/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.posts;
};

export const deletePostQuery = async (id) => {
  const response = await apiInstance.delete(`/post/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const likePost = async (id) => {
  const response = await apiInstance.put(`/post/like/${id}`,{}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const feedPosts = async ()=>{
  const response = await apiInstance.get("/post/feed", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.posts
}