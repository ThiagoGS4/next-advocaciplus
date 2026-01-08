import { apiLogin } from "@/services/api"
import { IUserProps } from "@/types/login"
import { destroyCookie, setCookie } from "nookies"
import { createContext, ReactNode, useContext, useState } from "react"
import { getApiClient } from "@/services/axios"
import { AxiosInstance } from "axios"
import { useRouter } from "next/router"

interface ILoginContextProps {
    signIn(username: string, password: string): Promise<boolean | string>
    signOut(): void
    apiClient: AxiosInstance
}

interface ILoginContextprovider {
    children: ReactNode
    session: IUserProps
}

const loginContext = createContext<ILoginContextProps>({} as ILoginContextProps)

export const useLogin = () => useContext(loginContext) //parei aqui(08/01/26), preciso fazer o logim funfar agora...

export function UseloginContext({ children, session: userSession }: ILoginContextprovider) {

    const [session, setSession] = useState<IUserProps | null>(userSession)

    const apiClient = getApiClient(session)

    const router = useRouter()

    async function signIn(email: string, password: string): Promise<string | boolean> {
        console.log("tentando logar...")
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const userData: any = (await apiLogin).post("/users/login", {
                email,
                password,
            })
            const expirationTime = new Date(new Date().setHours(new Date().getHours() + 3))

            const userLogged: IUserProps = {
                email: userData.email,
                status: "authenticated",
                username: userData.username,
                user: {
                    data: {
                        auth: {
                            token: userData.user.data.auth.token,
                            refresh_token: userData.user.data.auth.refresh_token
                        },
                        info: {
                            name: userData.user.data.info.name,
                            age: userData.user.data.info.age
                        }
                    }
                }
            }

            setSession(userLogged)

            setCookie(undefined, "advcp-auth-token-access", userData.user.data.auth.token, {
                path: '/',
                expires: expirationTime
            })
            setCookie(undefined, "advcp-auth-token-refresh", userData.user.data.auth.refresh_token, {
                path: '/',
                expires: expirationTime
            })

            //const claimsData = jwt.decode(userData.user.data.auth.token)
            //setCookie(undefined, "advcp-auth-token", claimsData)
            setCookie(undefined, "advcp-auth-token", userData.user.data.auth.token, {
                path: '/',
                expires: expirationTime
            })
            return true
        } catch (error) {
            return error as string
        }
    }

    function signOut(){
        destroyCookie(undefined, "advcp-access-token", {
            path: '/'
        })
        destroyCookie(undefined, "advcp-auth-token-access", {
            path: '/'
        })
        destroyCookie(undefined, "advcp-auth-token-refresh", {
            path: '/'
        })
        setSession(null);
        router.push('/');
    }

    return (
    <loginContext.Provider value={{signIn, signOut, apiClient}}>
        {children}
    </loginContext.Provider>)
}
