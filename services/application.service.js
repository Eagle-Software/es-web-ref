import axios from "axios";
import authHeader from './auth-header';

// const API_URL = "http://localhost:8080/api/auth/";
// const API_URL = process.env.EM_AUTH_API_URL;
const API_URL = process.env['REACT_APP_EM_AUTH_API_URL'];

export default class ApplicationService {

   static getFullApplication() {
      console.log(API_URL + 'application/full GET' );
      return axios.get(API_URL + 'application/full', {
         headers: {
            ...authHeader()
         }});
   }

   static get() {
      console.log(API_URL + "application GET ");
      return axios.get(API_URL + "application", {
         headers: {
            ...authHeader()
         }});
   }

   static submit( application ) {
      console.log( API_URL + "application POST" );
      return axios.post( API_URL + "application",
         application, {
            headers: {
               ...authHeader() 
            }});
   }

   static clear() {
      return axios.delete(API_URL + "application", {
         headers: {
            ...authHeader()
         }});
   }

   static getEmployers() {
      console.log(API_URL + 'application/employer GET');
      return axios.get(API_URL + 'application/employer', { headers: {
         ...authHeader()
      }});
   }

   static addEmployer( employer ) {
      console.log( API_URL + "application/employer POST" );
      console.log( employer );
      return axios.post( API_URL + "application/employer",
         employer,
         { headers: {
            ...authHeader()
         }});
   }

   static removeEmployer( employerId ) {
      console.log( API_URL + "application/employer DELETE" );
      console.log( employerId );
      return axios.delete( API_URL + "application/employer",
         { headers: {
            employerid: employerId,
            ...authHeader()
         }});
   }

   static getSchools() {
      console.log(API_URL + 'application/school GET');
      return axios.get(API_URL + 'application/school ', { headers: {
         ...authHeader()
      }});
   }

   static addSchool( school ) {
      console.log( API_URL + "application/school POST" );
      console.log( school );
      return axios.post( API_URL + "application/school",
         school,
         { headers: {
            ...authHeader()
         }});
   }

   static removeSchool( schoolId ) {
      console.log( API_URL + "application/school DELETE" );
      console.log( schoolId );
      return axios.delete( API_URL + "application/school",
         { headers: {
            schoolid: schoolId,
            ...authHeader()
         }});
   }

   static addReference( reference ) {
      console.log( API_URL + "application/reference POST" );
      console.log( reference );
      return axios.post( API_URL + "application/reference",
         reference,
         { headers: {
            ...authHeader()
         }});
   }

   static removeReference( referenceId ) {
      console.log( API_URL + "application/reference DELETE" );
      console.log( referenceId );
      return axios.delete( API_URL + "application/reference",
         { headers: {
            referenceid: referenceId,
            ...authHeader()
         }});
   }

   static getReferences() {
      console.log( API_URL + "application/reference GET" );
      return axios.get( API_URL + "application/reference",
         { headers: {
            ...authHeader()
         }});
   }

}
