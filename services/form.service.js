import axios from "axios";
import authHeader from './auth-header';

// const API_URL = "http://localhost:8080/api/auth/";
// const API_URL = process.env.EM_AUTH_API_URL;
const API_URL = process.env['REACT_APP_EM_AUTH_API_URL'];

class FormService {

   get(formKey) {
      console.log(API_URL + "form GET " + formKey);
      return axios.get(API_URL + "form", {
         headers: {
            formKey: formKey,
            ...authHeader()
         }
      }).then(response => {
         console.log("response:");
         console.log(response);
         return response;
      });
   }

   submit(form) {
      console.log(API_URL + "form POST");
      console.log(form.formKey)
      const resp = axios.post(API_URL + "form",
         form,
         { headers: {
            ...authHeader() 
         }
         }).then(response => {
            /* valid response -> successfully added to DB */
            console.log(response);
            return "Success";
         }).catch (response => {
            console.log("failure");
            console.log(response.response.data);
            console.log(response.response.status);
            console.log(response.response.headers);
         });
   }

   submitResponse(formKey, response) {

   }

   getResponse(formKey) {

   }

}

export default new FormService();
