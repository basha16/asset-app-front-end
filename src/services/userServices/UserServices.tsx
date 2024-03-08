import axios from 'axios'

const baseApiUrl = "https://konnectify-assesment-api-4.onrender.com"

class UserService {
    async createUser(user: any) {
        const response = await axios.post(`${baseApiUrl}/users/create`, user)
        return response.data
    }

    async updateUser(user: any) {
        const response = await axios.post(`${baseApiUrl}/users/update`, user)
        return response.data
    }

    async getUsers(userId: any) {
        const response = await axios.get(`${baseApiUrl}/users/get`, {
            params: { userId }
        })
        return response.data
    }

    async getUser(userId: any) {
        const response = await axios.get(`${baseApiUrl}/users/user`, {
            params: { userId }
        })
        return response
    }

    async checkUserIsExists(email: any) {
        const response = await axios.get(`${baseApiUrl}/users/is/exists`, {
            params: { email }
        })
        return response.data
    }

    async deleteUser(userId:any) {
        const response  = await axios.post(`${baseApiUrl}/users/delete`,{
            userId
        })
        return response.data
    }
}
const userService = new UserService()
export default userService