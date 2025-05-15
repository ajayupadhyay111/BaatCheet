import apiInstance from "@/utils/axios"

const token = localStorage.getItem("token");

export const getAllNotifications = async() => {
    const response = await apiInstance.get("/notifications",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const markAsRead = async() => {
    const response = await apiInstance.post("/notifications/read",{},{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}