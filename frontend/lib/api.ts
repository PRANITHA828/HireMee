
export const API_URL = "http://localhost:5000/api/v1";

type FetchOptions = RequestInit & {
    headers?: Record<string, string>;
};

export async function apiRequest<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { headers, ...customConfig } = options;

    const config: RequestInit = {
        ...customConfig,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        credentials: "include", // Important for httpOnly cookies
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
}
