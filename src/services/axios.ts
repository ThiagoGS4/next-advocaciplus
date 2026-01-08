import { IUserProps } from "@/types/login"
import axios from "axios"
import { destroyCookie, parseCookies } from "nookies"
import { revalidateToken } from "./revalidateToken"

export function getApiClient(session?: IUserProps | null, serverSide?: boolean) {
    const axiosInstance = axios.create({
        baseURL: "localhost:3000",
        timeout: 100000,
    })

    axiosInstance.interceptors.request.use(async function (config) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cookies: any = { ...parseCookies(undefined), date: Date.now() }

        config.headers["advcp-id-token"] = session?.email
        config.headers["advcp-access-token"] = serverSide
            ? session?.user.data.auth.token
            : cookies["advcp-auth-token-access"]
        config.headers["advcp-refresh-token"] = serverSide
            ? session?.user.data.auth.refresh_token
            : cookies["advcp-auth-token-refresh"]

        return config
    })

    if (session) {
        axiosInstance.interceptors.request.use(
            async (request) => {
                //usando um interceptador do axios, basicamente isso é usado para fazer algo
                //antes de enviar uma request para a API
                //nesse caso eu peço para ele revalidar o access token em TODA requisição

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const cookies: any = {
                    ...parseCookies(undefined),
                    date: Date.now(),
                }

                const res = await revalidateToken(
                    session,
                    serverSide
                        ? session.user.data.auth.token
                        : cookies["advcp-auth-token-access"],
                    serverSide
                        ? session.user.data.auth.refresh_token
                        : cookies["advcp-auth-token-refresh"]
                )
                if (res) {
                    return request
                } else {
                    destroyCookie(undefined, "advcp-auth-token")
                    window.location.href = "/"
                    throw "Unauthenticated"
                }
            },
            (error) => error
        )
    }

    axiosInstance.interceptors.response.use(
        (response) => response,
        async function (error) {
            if (error.response?.status === 401) {
                destroyCookie(undefined, "advcp-auth-token")
                window.location.href = "/"
                throw error
            } else return error.response
        }
    )

    return axiosInstance
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getApiLogin(cookies?: any) {
    const axiosInstance = axios.create({
        baseURL: "localhost:3000",
        timeout: 100000,
        withCredentials: true,
    })

    axiosInstance.defaults.headers.common['Cookie'] = cookies

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.code === 401) {
                console.log(error)
                destroyCookie(undefined, "advcp-auth-token")
                window.location.href = "/"
                throw error
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                error
            }
        }
    )
    return axiosInstance
}
