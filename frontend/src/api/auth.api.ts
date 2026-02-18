import { api } from "../utils/axios";
import type { LoginPayload } from "./types";

export const loginApi = (data: LoginPayload) =>
    api.post("/auth/login", data);

export const logoutApi = () =>
    api.post("/auth/logout");
