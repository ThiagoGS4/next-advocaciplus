import { IUserProps } from "@/types/login";
import axios from "axios";
import { parseCookies } from "nookies";

async function getApiClient(session: IUserProps, serverSide?: boolean){
    const axiosInstance = axios.create({
        baseURL: 'localhost:3000',
        timeout: 100000
    })

    axiosInstance.interceptors.request.use( async function (config) {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cookies: any = { ...parseCookies(undefined), date: Date.now() }

        config.headers["advcp-id-token"] = session?.user.data.auth.username
        config.headers["advcp-access-token"] = serverSide ? session.user.data.auth.token : cookies["advcp-auth-token-access"]
        config.headers["advcp-refresh-token"] = serverSide ? session.user.data.auth.refresh_token : cookies["advcp-auth-token-refresh"]

        return config
    });

    if(session){
        axiosInstance.interceptors.request.use( async (request) =>{
                const cookies: any = { ...parseCookies(undefined), date: Date.now() }

                const res = revalidateToken(
                    session,
                    serverSide ? session.user.data.auth.token : cookies["advcp-auth-token-access"],
                    serverSide ? session.user.data.auth.refresh_token : cookies["advcp-auth-token-refresh"]
                )
            },
            (error) => error
        )
    }
    
    axiosInstance.interceptors.response.use(){
        if (error.response?.status === 401) {
    await refreshToken();
    return instance(error.config); // Retry original request
  }

  throw error;
    }

}
async function getApiLogin(){

}