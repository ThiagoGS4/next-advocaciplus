import { api, apiLogin } from "@/services/api"
import { IUserProps } from "@/types/login"
import { destroyCookie, setCookie } from "nookies"
import { createContext, ReactNode, useContext, useState } from "react"
import { getApiClient } from "@/services/axios"
import { AxiosInstance } from "axios"
import { useRouter } from "next/router"
import { GetServerSidePropsContext } from "next"

interface ILoginContextProps {
    signIn: (username: string, password: string) => Promise<boolean | string>
    signOut: () => void
    logTest: () => string
    apiClient: AxiosInstance
}

interface ILoginContextprovider {
    children: ReactNode
    session: IUserProps
}

const LoginContext = createContext<ILoginContextProps>({} as ILoginContextProps)

export const useLogin = () => useContext(LoginContext) //parei aqui(08/01/26), preciso fazer o login funfar agora...

export function LoginContextProvider({
    children,
    session: userSession,
}: ILoginContextprovider) {
    const [session, setSession] = useState<IUserProps | null>(userSession)

    const apiClient = getApiClient(session)

    const router = useRouter()

    const signIn = async (
        email: string,
        password: string
    ): Promise<string | boolean> => {
        console.log("tentando logar...", email, password)
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const userData: any = await api.post("/login", {
                email: email,
                password: password,
            })
            console.log("aqui -> ", userData)

            const expirationTime = new Date(
                new Date().setHours(new Date().getHours() + 3)
            )

            const userLogged: IUserProps = {
                user: {
                    email: userData.email,
                    status: "authenticated",
                    username: userData.username,
                    user: {
                        data: {
                            auth: {
                                token: userData.data.accessToken,
                                refresh_token:
                                    userData.data.user.user.data.refresh_token,
                            },
                            info: {
                                name: userData.data.user.user.info.name,
                                age: userData.data.user.user.info.age,
                            },
                        },
                    },
                },
            }

            console.log("chega aqui 1")

            setSession(userLogged)

            console.log("chega aqui 2")

            setCookie(
                undefined,
                "advcp-auth-token-access",
                userLogged.user.user.data.auth.token,
                {
                    path: "/",
                    expires: expirationTime,
                }
            )
            setCookie(
                undefined,
                "advcp-auth-token-refresh",
                userLogged.user.user.data.auth.refresh_token,
                {
                    path: "/",
                    expires: expirationTime,
                }
            )

            //const claimsData = jwt.decode(userData.user.data.auth.token)
            //setCookie(undefined, "advcp-auth-token", claimsData)
            setCookie(
                undefined,
                "advcp-auth-token",
                userLogged.user.user.data.auth.token,
                {
                    path: "/",
                    expires: expirationTime,
                }
            )
            console.log("login concluído...")
            return true
        } catch (error) {
            return error as string
        }
    }

    const signOut = () => {
        destroyCookie(undefined, "advcp-access-token", {
            path: "/",
        })
        destroyCookie(undefined, "advcp-auth-token-access", {
            path: "/",
        })
        destroyCookie(undefined, "advcp-auth-token-refresh", {
            path: "/",
        })
        setSession(null)
        router.push("/")
    }

    const logTest = () => {
        return "aaa"
    }

    return (
        <LoginContext.Provider value={{ signIn, signOut, apiClient, logTest }}>
            {children}
        </LoginContext.Provider>
    )
}

export function useLoginContext() {
    const ctx = useContext(LoginContext)
    if (!ctx)
        throw new Error(
            "useLoginContext precisa estar dentro de <MeuProvider />"
        )
    return ctx
}
