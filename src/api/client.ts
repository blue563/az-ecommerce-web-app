const BASE_URL = 'https://fakestoreapi.com'

export class ApiError extends Error {
    status?: number
    constructor(message:string, status?: number){
        super(message)
        this.name = 'ApiError'
        this.status = status
    }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, init)
    if (!response.ok) {
        throw new ApiError(`Request failed with status ${response.status}`, response.status)
    }
    return (await response.json()) as T
}

export const apiClient = {
    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, body: unknown) =>
        request<T>(path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
}