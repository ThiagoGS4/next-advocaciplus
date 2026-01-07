import { IUserProps } from "@/types/login";
import { createContext, ReactNode, useContext } from "react"

interface ILoginContextProps {
    signIn(username: string, password: string): Promise<boolean | string>
}

interface ILoginContextprovider {
    children: ReactNode
    session: IUserProps
}

const loginContext = createContext<ILoginContextProps>({} as ILoginContextProps);

export const useLogin = () => useContext(loginContext)

export function useloginContext({children, session}: ILoginContextprovider){

    async function signIn(username: string, password: string): Promise<boolean | string>{
        //(07/01/26)terminar essa função...
    }

    return (
        <>
        </>
    )
}