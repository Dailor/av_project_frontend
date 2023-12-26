import {Axios} from "axios";

export interface UserProject {
    username: string
    role: "ADMIN" | "SPONSOR" | "USER"
}

export interface AuthContextType {
    axiosInstance: Axios
    currentUser: any
    isAuth: any
    login: { (username: string, password: string): Promise<any> }
    logout: { (): void }

}

export interface AdoptAnimal {
    id: number
    name: string
    breed: string
    photoUrl: string
    old: number
    weight: number
    type: string
    gender: 'M' | 'F'
}