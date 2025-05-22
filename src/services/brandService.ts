import api from "../api";


export const getBrands = async () => {
    const response = await api.get("/brand/all", {
        withCredentials: true,
    });
    return response.data;
};

export const getBrandById = async (id: string) => {
    const response = await api.get(`/brand/${id}`, {
        withCredentials: true,
    });
    return response.data;
};

export const createBrand = async (payload: any) => {
    const response = await api.post("/brand/create-brand", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
};

export const updateBrand = async (id: string, payload: any) => {
    const response = await api.patch(`/brand/update-brand/${id}`, payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
};

export const deleteBrand = async (id: string) => {
    const response = await api.delete(`/brand/delete-brand/${id}`, {
        withCredentials: true,
    });
    return response.data;
};