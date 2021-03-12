import axios from 'axios'
import authHeader from './auth-header'

const API_URL = process.env['REACT_APP_EM_AUTH_API_URL'] + 'user'

class UserService {

  getPublicContent() {
    return axios.get(API_URL + '/all')
  }

  getUserContent() {
    return axios.get(API_URL + '/user', { headers: authHeader() })
  }

  getModeratorContent() {
    return axios.get(API_URL + '/mod', { headers: authHeader() })
  }

  getAdminContent() {
    return axios.get(API_URL + '/admin', { headers: authHeader() })
  }
}

export default new UserService()
