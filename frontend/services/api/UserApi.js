import { axiosClient } from "../../src/api/axios"
const UserApi = {
    login: async (email, password) => {
      //  await axiosClient.get('/sanctum/csrf-cookie');
        return await axiosClient.post('/login', { email, password }, {
            withCredentials: true

        });
    },

    register: async (email, password,fullname) => {
        //  await axiosClient.get('/sanctum/csrf-cookie');
          return await axiosClient.post('/register', { email, password ,fullname}, {
             

          });
      },

    logout: async () => {
        return await axiosClient.post('/logout')

    },
    getuser: async(id)=>{
       return await axiosClient.get('/api/user')
    }
}
export default UserApi;
