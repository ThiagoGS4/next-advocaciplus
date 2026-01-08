export interface IUserProps {
    status: "authenticated" | "loading" | "unauthenticated"
    email: string
    username: string
    user: {
        data: {
            auth: {
                token: string
                refresh_token: string
            }
            info: {
                name: string
                age: number
            }
        }
    }
}
