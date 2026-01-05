import { createContext, useContext } from "react"

interface ILoginContextProps {

}

const loginContext = createContext<ILoginContextProps>({} as ILoginContextProps);

export const useLogin = () => useContext(loginContext)

export function useloginContext(){

    

    return (
        <>
        </>
    )
}