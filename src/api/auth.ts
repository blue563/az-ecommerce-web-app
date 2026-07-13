import { apiClient } from "./client"
import type { LoginCredentials, LoginResponse } from "@/types/auth"

export function login(credentials: LoginCredentials): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/login', credentials)
}