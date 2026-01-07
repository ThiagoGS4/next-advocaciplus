export interface IUserProps {
    status: "authenticated" | "loading" | "unauthenticated"
    user: {
        data: {
            auth: {
                email: string
                username: string
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
