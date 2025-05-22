export interface ILoginPayload {
    email: string,
    password: string,
}

export interface IRegisterPayload {
    name: string,
    email: string,
    phone: string,
    password: string
    passwordConfirmation: string,
}

export interface IPasswordPayload {
    currentPassword: string,
    newPassword: string,
}

export interface IUser {
    id: string,
    name: string,
    email: string,
    phone: string,
    role: string,
    imageUrl: string,
}

export interface IAuthContextType {
    user: User | null,
    loading: boolean,
    login: (payload: ILoginPayload) => Promise<IUser>;
    logout: () => Promise<void>,
    checkAuth: () => Promise<void>,
}

export interface IBrand {
    id: string,
    name: string,
    imageUrl: string,
}

export interface IVehicle {
    id: string,
    name: string,
    type: string,
    brandId: IBrand,
    brand: {
        id: string,
        name: string
    }
    price: number,
    status: string,
    year: number,
    seat: number,
    horse_power: number,
    description: string,
    spesification: string,
    imageUrl: string,
}

export type LoginResponse = {
    data: IUser
}