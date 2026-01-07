import { IUserProps } from "@/types/login";
import axios from "axios";

export function revalidateToken(userSession: IUserProps, acessToken: string, acessRefreshToken: string){
    const expirationTime = new Date(new Date().setHours(new Date().getHours() + 3))

    const headers = userSession ? {
        "advcp-id-token": userSession.user.data.auth.username,
        "advcp-access-token": userSession.user.data.auth.token,
        "advcp-refresh-token": userSession.user.data.auth.refresh_token,
    } : {}

    const axiosInstance = axios.create({
        baseURL: 'localhost:3000',
        timeout: 100000
    })
        //parei aqui (07/01/26), preciso terminar essa função de revalidação (vai usar???) para login e manter sessão
}