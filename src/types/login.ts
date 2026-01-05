export interface IUserProps {
    status: 'authenticated' | 'loading' | 'unauthenticated'
    user: {
        data: {
            email: string
            username: string
            token: string
        }
        info: {
            name: string
            age: number
        }
    }
}