import useSWR from "swr";
import { getBrandById } from "../services/brandService";

export const useBrandName = (id: string) => {
    const { data } = useSWR(id ? `brand-${id}` : null, () => getBrandById(id));

    return {
        name: data?.name,
    };
};