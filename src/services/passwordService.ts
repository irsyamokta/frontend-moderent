import api from "../api";

export const changePassword = async (payload: any) => {
    const response = await api.patch("/password/change-password", payload, {
        withCredentials: true,
    });
    return response.data;
};