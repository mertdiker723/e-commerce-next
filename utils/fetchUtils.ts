import { logoutUser } from "@/services/auth.services";
import { store } from "@/lib/redux/store";
import { logout } from "@/lib/redux/slices/userSlice";

interface FetchOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: Record<string, string>;
    body?: unknown;
    credentials?: RequestCredentials;
}

// Convert backend URL to proxy URL
const convertToProxyUrl = (url: string): string => {
    const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    if (!backendUrl) {
        return url;
    }
    
    // If URL starts with backend URL, convert to proxy URL
    if (url.startsWith(backendUrl)) {
        const path = url.replace(backendUrl, '').replace(/^\//, '');
        return `/api/proxy/${path}`;
    }
    
    return url;
};

export const fetchApi = async <T = unknown>(
    url: string,
    options: FetchOptions = {}
): Promise<T> => {
    // Convert to proxy URL to handle cookies properly
    const proxyUrl = convertToProxyUrl(url);
    
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

    const response = await fetch(proxyUrl, requestOptions);

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
