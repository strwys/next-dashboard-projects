// types/next-auth.d.ts
import { DefaultSession } from "next-auth"

declare module "next-auth" {

    interface Session {
        accessToken: string
        user: User
    }

    interface User {
        id: any
        user_id: string
        username: string
        role: string
        email: string
        employee_id: string
        created_at: string
        updated_at: string
        token?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string
        user: User
    }
}