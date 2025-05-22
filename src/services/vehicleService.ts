import api from "../api";

export const getVehicles = async ({page, limit}: {page: number, limit: number}) => {
    const response = await api.get("/vehicle/all", {
        withCredentials: true,
        params: {
            page,
            limit
        }
    });
    return response.data;
};

export const getVehicleById = async (id: string) => {
    const response = await api.get(`/vehicle/${id}`, {
        withCredentials: true,
    });
    return response.data;
};

export const createVehicle = async (payload: any) => {
    const response = await api.post("/vehicle/create-vehicle", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
};

export const updateVehicle = async (id: string, payload: any) => {
    const response = await api.patch(`/vehicle/update-vehicle/${id}`, payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
};

export const deleteVehicle = async (id: string) => {
    const response = await api.delete(`/vehicle/delete-vehicle/${id}`, {
        withCredentials: true,
    });
    return response.data;
};