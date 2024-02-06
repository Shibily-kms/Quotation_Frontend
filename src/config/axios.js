import axios from 'axios'


const baseSetup = {
    userAxios: axios.create({
        baseURL: 'http://localhost:8001/',
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    customerAxios: axios.create({
        baseURL: 'http://localhost:8004/',
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    purifierAxios: axios.create({
        baseURL: 'http://localhost:8003/',
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    wholeAxios: axios.create({
        baseURL: 'http://localhost:8006/',
        headers: {
            'Content-Type': 'application/json'
        }
    }),
}


// Add an interceptor to userAxios
baseSetup.userAxios.interceptors.request.use(config => {
    let userToken = localStorage.getItem('_tkn_stf')
    config.headers['Authorization'] = `Bearer ${userToken}`
    return config
})

baseSetup.customerAxios.interceptors.request.use(config => {
    let userToken = localStorage.getItem('_tkn_stf')
    config.headers['Authorization'] = `Bearer ${userToken}`
    return config
})
baseSetup.purifierAxios.interceptors.request.use(config => {
    let userToken = localStorage.getItem('_tkn_stf')
    config.headers['Authorization'] = `Bearer ${userToken}`
    return config
})
baseSetup.wholeAxios.interceptors.request.use(config => {
    let userToken = localStorage.getItem('_tkn_stf')
    config.headers['Authorization'] = `Bearer ${userToken}`
    return config
})


export const { userAxios, customerAxios, purifierAxios, wholeAxios } = baseSetup


