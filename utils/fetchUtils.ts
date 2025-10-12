import { logoutUser } from "@/services/auth.services";
import { store } from "@/lib/redux/store";
import { logout } from "@/lib/redux/slices/userSlice";

interface FetchOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: Record<string, string>;
    body?: unknown;
    credentials?: RequestCredentials;
}

export const fetchApi = async <T = unknown>(
    url: string,
    options: FetchOptions = {}
): Promise<T> => {
    const requestOptions: RequestInit = {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        credentials: options.credentials || "include",
    };

    if (options.body) {
        requestOptions.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            await logoutUser();
            store.dispatch(logout());
        }

        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const fetchApiSSR = async <T = unknown>(
    url: string,
    options: FetchOptions = {}
): Promise<T> => {
    const requestOptions: RequestInit = {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        credentials: options.credentials || "include",
        cache: "no-store",
    };

    if (options.body) {
        requestOptions.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
        const errorData = await response.json();

        const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
        (error as unknown as { status: number }).status = response.status;
        throw error;
    }

    return response.json();
};
