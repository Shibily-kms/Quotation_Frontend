import axios from 'axios'


const baseSetup = {
    userAxios: axios.create({
        baseURL: 'https://sales.api.alliancedev.in/',
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    customerAxios: axios.create({
        baseURL: 'https://controlnex.api.alliancedev.in/',
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    purifierAxios: axios.create({
        baseURL: 'https://purifierservice.api.alliancedev.in/',
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    wholeAxios: axios.create({
        baseURL: 'https://whservice.api.alliancedev.in/',
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


