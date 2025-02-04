import { ApiResponse, LoginRequest, User } from "@/app/api/auth/[...nextauth]/api"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
			credentials: {
				userid: {
                    label: "userid",
					type: "text",
				},
				password: {
					label: "password",
					type: "password",
				},
			},
            async authorize(credentials, req) {
                const apiBaseURL : String | undefined = process.env.NEXT_PUBLIC_API_URL

                const loginRequest : LoginRequest = {
                    user_id : credentials?.userid!,
                    password : credentials?.password!
                }
                
                try {
                    const apiResponse = await fetch(`${apiBaseURL}/api/v1/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'User-Agent': req.headers?.['user-agent'],
                        },
                        body: JSON.stringify(loginRequest),
                    });
    
                    const resp : ApiResponse = await apiResponse.json()
                        if (resp.code != 200) {
                        throw new Error(resp.message)    
                    } 
        
                    const user : User = resp.data 
                    const accessToken = resp.data.token;

                    return {...user, accessToken}
                } catch(error) {
                    throw error    
                }                   
            }
        })
    ],
    pages:{
        signIn:"/auth/signin"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token!
                token.user = user
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string
            session.user = token.user as User
            return session
        }
    },
}
