import { axiosClient } from "../api/axios"
const Accounts_management = {
    create: async (payload) => {

        const { accountType, email, fullname, password } = payload;
        let filteredPayload;
        if (accountType === "sysadmin") {
            filteredPayload = { email, fullname, password };
        } else {
            filteredPayload = payload;
        }

        return await axiosClient.post(`api/${accountType}`,payload)
    },

    edit: async (userid,payload,table) => {

        return await axiosClient.put(`api/${table}/${userid}`,payload)
    },

    all: async (table) => {
        return await axiosClient.get(`api/${table}`)
    },


    show: async (table,id) => {
        return await axiosClient.get(`api/${table}/${id}`)
    },
    delete: async (id,table) => {

        return await axiosClient.delete(`api/${table}/${id}`);
    },

}
export default Accounts_management;
