import axios from 'axios'

const baseApiUrl = "https://konnectify-assesment-api-4.onrender.com"

class AssetService {
    async createAsset(asset: any) {
        const response = await axios.post(`${baseApiUrl}/asset/create`, asset)
        return response.data
    }

    async updateAsset(asset: any) {
        const response = await axios.post(`${baseApiUrl}/asset/update`, asset)
        return response.data
    }

    async getAllAsset() {
        const currentUserPosition = sessionStorage.getItem('position')
        const currentUser = sessionStorage.getItem('id')

        if (currentUserPosition === 'normal') {
            const response = await axios.get(`${baseApiUrl}/asset/get/user`, {
                params: { userId:currentUser }
            })
            return response.data
        }
        const response = await axios.get(`${baseApiUrl}/asset/get`)
        return response.data
    }

    async getNormalUsers() {
        const response = await axios.get(`${baseApiUrl}/users/normal`)
        return response.data
    }
    async deleteAssetUser(assetUserId:any) {
        const response  = await axios.post(`${baseApiUrl}/asset/delete`,{
            assetUserId
        })
        return response.data
    }
}
const assetService = new AssetService()
export default assetService