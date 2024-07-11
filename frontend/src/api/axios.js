import axios from 'axios';

/**
 * @typedef {import('axios').AxiosInstance} AxiosInstance
 */

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
})
/** @type {AxiosInstance} */

