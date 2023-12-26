import axios from "axios";
import {BACKEND_URL} from "@/routes";

export const serverSideAxios = axios.create({
    baseURL: BACKEND_URL,
    timeout: 3000,
    timeoutErrorMessage: "timeout"
});