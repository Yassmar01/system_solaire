import { axiosClient } from "../../api/axios"
const AdminApi = {
    login: async (email,password) => {
        return await axiosClient.post('/login', {
           email,
           password,
        })
    },
    logout: async () => {
        return await axiosClient.post('/logout')
    },
    getuser: async()=>{
       return await axiosClient.get('/api/user')
    }
}
export default AdminApi;
