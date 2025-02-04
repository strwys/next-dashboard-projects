export interface ApiResponse {
    code: number
    message: string
    data: any
}

export interface LoginRequest {
    user_id: string,
    password: string
}

export interface LoginResponse {
    token: string,
    users: string
}

export interface User {
    id: any
    user_id: string;
    username: string;
    role: string;
    email: string;
    employee_id: string;
    created_at: string;
    updated_at: string;
}