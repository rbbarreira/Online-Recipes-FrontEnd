export interface User {
    id: number,
    userName: string,
    email: string,
    role: string,
    passwordHash: any,
    passwordSalt: any    
}

export interface Register {
    userName: string,
    email: string, 
    password: string,    
    confirmPassword: string
}

export interface Login {
    email: string,
    password: string
}

export interface LoginResponse {
    token: string,
    userName: string,
    role: string
}