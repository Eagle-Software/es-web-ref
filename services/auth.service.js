import axios from "axios"

// const API_URL = "http://localhost:8080/api/auth/"
// const API_URL = process.env.EM_AUTH_API_URL
const API_URL = process.env['REACT_APP_EM_AUTH_API_URL']

export const USERTYPES = {
   // user: 'user',
   applicant: 'applicant',
   customer: 'customer',
   // employee: 'employee'
}

class AuthService {

   static get userTypes() {
      return USERTYPES
   }

   login(email, password) {
      console.log(API_URL + "login")
      return axios
         .post(API_URL + "login", {
            email,
            password
         })
         .then(response => {
            if (response.data.accessToken) {
               localStorage.setItem("user", JSON.stringify(response.data))
            }
            return response.data.accessToken
         })
   }

   logout() {
      localStorage.removeItem("user")
   }

   register(email, password, userType) {
      // Need to keep in switch statements to pass different properties
      // for different userTypes
      console.log(userType)
      console.log(AuthService.userTypes)
      switch (userType) {
         case AuthService.userTypes.applicant:
            return axios.post(API_URL + "register/applicant", {
               email,
               password
            })
         case AuthService.userTypes.customer:
            return axios.post(API_URL + "register/customer", {
               email,
               password
            })
         case AuthService.userTypes.employee:
            return axios.post(API_URL + "register/employee", {
               email,
               password
            })
         default:
            // userTypes.user
            return axios.post(API_URL + "register", {
               email,
               password
            })
      }
   }

   getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'))
   }
}

export default new AuthService()
