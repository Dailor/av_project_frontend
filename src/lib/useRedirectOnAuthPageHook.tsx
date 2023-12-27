import {useAuth} from "@/auth/AuthProvider";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export const useRedirectOnAuthPageHook = () => {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        router.push("/login");
    }, [auth?.isAuth, router]);
};