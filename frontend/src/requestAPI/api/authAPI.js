import apiInstance from "@/utils/axios";

export const loginUser = async (formData) => {
  const response = await apiInstance.post("/auth/login", formData);
  return response.data;
};

export const signUpUser = async (formData) => {
  const response = await apiInstance.post("/auth/signup",formData)
  return response.data;
};