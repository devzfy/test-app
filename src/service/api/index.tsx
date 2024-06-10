import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

api.defaults.headers.common['Accept'] = 'application/json'
api.interceptors.request.use(
  (configs) => {
    configs.headers.Authorization = `Bearer ${localStorage.getItem('auth-token')}`
    return configs
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api