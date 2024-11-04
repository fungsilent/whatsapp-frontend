import axios from 'axios'

const axiosBackend = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})

axiosBackend.interceptors.request.use(config => {
    /* Do something before request is sent */
    // Set auth token
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

axiosBackend.interceptors.response.use(
    response => {
        /*
         * Within the range of 2xx
         * Do something with response data
         */
        return response.data
    },
    error => {
        /*
         * Outside the range of 2xx
         * Do something with response error
         */
        return Promise.reject(error.response.data)
    }
)

export default axiosBackend
