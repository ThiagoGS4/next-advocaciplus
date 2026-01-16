import { IUserProps } from "@/types/login";
import axios from "axios";

export async function revalidateToken(userSession: IUserProps, acessToken: string, acessRefreshToken: string){
    const expirationTime = new Date(new Date().setHours(new Date().getHours() + 3))

    const headers = userSession ? {
        "advcp-id-token": userSession.user.email,
        "advcp-access-token": userSession.user.user.data.auth.token,
        "advcp-refresh-token": userSession.user.user.data.auth.refresh_token,
    } : {}

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 100000
    })

    const resp: IUserProps = await axiosInstance.get('/users/1')
    //como estou usando json server auth e não um backend real 
    // não tem como fazer essa revalidação então vou deixar ela mockada
    console.log('token ativo encontrado: ', resp.user.user.data.auth.token);
    if(headers["advcp-access-token"] === resp.user.user.data.auth.token){
        return true
    }
    
        //parei aqui (07/01/26), preciso terminar essa função de revalidação (vai usar???) para login e manter sessão
}