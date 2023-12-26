import axios, {Axios} from "axios";

import {BACKEND_URL, LOGIN_API} from "@/routes";
import {AuthContextType, UserProject} from "@/auth/types";
import Cookies from 'universal-cookie';
import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";

const ACCESS_KEY_TTL = 1000 * 3600 * 2;
const ACCESS_KEY = "ACCESS_KEY";
const USERNAME_KEY = "USERNAME_KEY";
const ROLE_KEY = "ROLE_KEY";

function parseJwt(token: string) {
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
}


function getAccessToken(cookie: Cookies | null) {
    if (cookie !== null)
        return cookie.get(ACCESS_KEY);
    return null;
}

function loadCurrentUserLocal(cookie: Cookies) {
    const accessToken = getAccessToken(cookie);

    if (accessToken)
        return {
            username: localStorage.getItem(USERNAME_KEY) as string,
            role: localStorage.getItem(ROLE_KEY) as UserProject['role']
        };
    return null;
}

const isValidAccessToken = (cookie: Cookies | null) => {
    return !!getAccessToken(cookie);
};


interface Props {
    children: React.ReactNode
}


interface AxiosInstanceWrapped {
    axiosInstance: Axios
}

export function AuthProvider({children}: Props) {
    const router = useRouter();

    const [cookie, setCookie] = useState<Cookies | null>(null);
    const [currentUser, setCurrentUser] = useState<UserProject | null>(null);
    const [axiosInstanceWrapped, setAxiosInstanceWrapped] = useState<AxiosInstanceWrapped | {}>({});

    useEffect(() => {
        const cookie = new Cookies(null, {path: '/'});

        const getAxiosInstance = (cookie: Cookies) => {
            const instance = axios.create({
                baseURL: BACKEND_URL,
                timeout: 3000,
                timeoutErrorMessage: "timeout"
            });

            instance.interceptors.request.use(
                (config) => {
                    const accessToken = cookie.get(ACCESS_KEY);

                    if (accessToken)
                        config.headers.Authorization = `Bearer ${accessToken}`;

                    return config;
                }
            );

            instance.interceptors.response.use((config) => {
                cookie.remove(ACCESS_KEY);
                localStorage.removeItem(USERNAME_KEY);
                setCurrentUser(null);

                return config;
            });

            return instance;
        };

        const axiosTmp = getAxiosInstance(cookie);
        const currentUser = loadCurrentUserLocal(cookie);

        setCookie(cookie);
        setCurrentUser(currentUser);
        setAxiosInstanceWrapped({'axiosInstance': axiosTmp});

        if (currentUser === null) {
            router.push('/').then(() => {
            });
        }
    }, []);

    const axiosInstance = useMemo(() => {
        return "axiosInstance" in axiosInstanceWrapped ? axiosInstanceWrapped.axiosInstance : null;
    }, [axiosInstanceWrapped]);

    const login = useCallback((username: string, password: string) => {
        return (axiosInstance as Axios)
            .post(LOGIN_API, {
                email: username, password
            })
            .then(res => {
                const data = parseJwt(res.data.token);
                const role = res.data.role;

                cookie && cookie.set(ACCESS_KEY, res.data.token, {
                    expires: new Date((new Date()).getTime() + ACCESS_KEY_TTL)
                });

                localStorage.setItem(USERNAME_KEY, data.username);
                localStorage.setItem(ROLE_KEY, role);

                setCurrentUser({
                    username: data.username,
                    role: data.role
                });
            });
    }, [axiosInstance, cookie]);

    const logout = useCallback(() => {
        (cookie as Cookies).remove(ACCESS_KEY);
        localStorage.removeItem(USERNAME_KEY);
        setCurrentUser(null);
    }, [cookie]);

    const getCurrentUser = useCallback(() => {
        if (!!currentUser && !isValidAccessToken(cookie)) {
            setCurrentUser(null);

            return null;
        }
        return currentUser;
    }, [cookie, currentUser]);

    const isAuth = useMemo(() => {
        return !!getCurrentUser();
    }, [getCurrentUser]);

    return (
        <AuthContext.Provider
            value={{
                axiosInstance: (axiosInstance as Axios),
                currentUser,
                isAuth,
                login,
                logout
            }}>{children}</AuthContext.Provider>
    );
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}