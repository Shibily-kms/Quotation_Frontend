import axios from 'axios'


const baseSetup = {
    userAxios: axios.create({
        baseURL: 'http://192.168.204.221:8001/',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


// Add an interceptor to userAxios
baseSetup.userAxios.interceptors.request.use(config => {
    let userToken = localStorage.getItem('_tkn_stf')
    config.headers['Authorization'] = `Bearer ${userToken}`
    return config
})


export const { userAxios } = baseSetup


