import axios from "axios"

const baseApiUrl = "https://konnectify-assesment-api-4.onrender.com"

class AuthServices  {
    async login(param:any) {
        const response = await axios.post(`${baseApiUrl}/login`,param)
        return response.data
    }
    async register(param:any) {
        const response = await axios.post(`${baseApiUrl}/register`,param)
        return response.data
    }

    async getUser() {
        const response = await axios.get(`${baseApiUrl}/`)
        return response
    }
}

const authServices = new AuthServices()

export default authServices