/*
 * Run on Client to retrieve access token from localStorage
 * if present, and return it to the caller - server?
 */
export default function authHeader() {
   const user = JSON.parse(localStorage.getItem('user'));

   if (user && user.accessToken) {
      console.log("adding token to request");
      return {
         'x-access-token': user.accessToken
      };
   } else {
      return {};
   }
}
