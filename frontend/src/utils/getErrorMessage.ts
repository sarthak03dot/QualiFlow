import axios from "axios";

interface ApiErrorResponse {
    message?: string;
}

export function getErrorMessage(err: unknown): string {
    if (axios.isAxiosError<ApiErrorResponse>(err)) {
        return err.response?.data?.message ?? "Something went wrong";
    }
    return "Something went wrong";
}
