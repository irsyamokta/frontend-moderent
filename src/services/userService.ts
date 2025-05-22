import api from "../api";

export const getUsers = async ({page, limit}: {page: number, limit: number}) => {
    const response = await api.get("/user/all", {
        withCredentials: true,
        params: {
            page,
            limit
        }
    });
    return response.data;
};

export const getUserById = async (id: string) => {
    const response = await api.get(`/user/${id}`, {
        withCredentials: true,
    });
    return response.data;
};

export const updateUser = async (id: string, payload: any) => {
    const response = await api.patch(`/user/update-user/${id}`, payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
};

export const deleteUser = async (id: string) => {
    const response = await api.delete(`/user/delete-user/${id}`, {
        withCredentials: true,
    });
    return response.data;
};