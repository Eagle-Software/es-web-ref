import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth/";
// const API_URL = process.env.EM_AUTH_API_URL;
const API_URL = process.env['REACT_APP_EM_AUTH_API_URL'];

class ContactService {

   submit(message) {
      console.log(API_URL + "contact POST");
      console.dir(message)
      const resp = axios.post(API_URL + "contact",
         message,
         { 

         }).then( (response) => {
            /* valid response -> successfully added to DB */
            console.log(response);
            return "Success";
         }).catch ( (response) => {
            console.log("failure");
            if (response.response) {
               console.log(response.response.data);
               console.log(response.response.status);
               console.log(response.response.headers);
            } else {
               console.log("No response from API server")
            }
         });

   }

}

export default new ContactService();
