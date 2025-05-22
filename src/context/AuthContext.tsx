import { createContext, useContext, useMemo } from "react";
import useSWR from "swr";
import authService from "../services/authService";
import type { ILoginPayload, IUser, IAuthContextType } from "../types/index";

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

const fetchUser = async (): Promise<IUser> => {
    return await authService.me();
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: user, error, mutate, isValidating } = useSWR("/me", fetchUser);

    const login = async (payload: ILoginPayload): Promise<IUser> => {
        const res = await authService.signin(payload); 
        mutate(res.data, false);
        return res.data; 
    };

    const logout = async () => {
        await authService.logout();
        mutate(undefined, false);
    };

    const checkAuth = async () => {
        await mutate();
    };

    const value = useMemo(() => ({
        user: user || null,
        loading: isValidating && !user && !error,
        login,
        logout,
        checkAuth
    }), [user, isValidating, error]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth harus digunakan dalam AuthProvider");
    }
    return context;
};
