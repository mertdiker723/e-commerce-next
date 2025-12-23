import { logoutUser } from "@/services/auth.services";
import { store } from "@/lib/redux/store";
import { logout } from "@/lib/redux/slices/userSlice";

interface FetchOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: Record<string, string>;
    body?: unknown;
    credentials?: RequestCredentials;
}

// Helper function to get cookie value by name
const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }
    return null;
};

export const fetchApi = async <T = unknown>(
    url: string,
    options: FetchOptions = {}
): Promise<T> => {
    // Get token from cookie
    const token = getCookie('token');
    
    const requestOptions: RequestInit = {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), // Add token to Authorization header
            ...options.headers,
        },
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

        let errorData;
        try {
            errorData = await response.json();
        } catch {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
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
