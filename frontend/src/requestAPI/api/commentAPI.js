import apiInstance from "@/utils/axios"

const token = localStorage.getItem("token")

export const addComment = async (data)=>{
    const response = await apiInstance.post(`/comment/${data.postId}`,{text:data.comment},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data;
}
export const getPostComments = async (id)=>{
    const response = await apiInstance.get(`/comment/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data.comments;
}
export const deleteComment = async ()=>{}