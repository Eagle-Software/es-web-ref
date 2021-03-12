import React, { Component } from "react";
import Form from 'react-bootstrap/Form';

import ApplicationService from "../../services/application.service";
import ApplicationComponent from './application.component';

export default class ReviewPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         message: "Loading"
      };
   }

   componentDidMount() {
      ApplicationService.getFullApplication().then( (response) => {
         if (response) {
            if (response.data) {
               this.setState({
                  message: '',
                  application: response.data
               });
            } else {
               this.setState({
                  message: 'No application found.'
               });
            }
         } else {
            this.setState({
               message: 'Null response from server. Contact administrator.'
            });
         }
      }, (err) => {
         if (err) {
            console.log(err.response);
            this.setState({
               message: 'Database service error, contact administrator.'
            });
         } else {
            console.log('no response or error');
            this.setState({
               message: 'Unable to connect to database. Try logging out and back in.'
            });
         }
      });
   }

   render() {
      console.log(this.state);
      return (
         <Form.Group>
            <Form.Label>
               <h4>Review your application:</h4>
            </Form.Label>
            { this.state.message !== '' ? (
               <Form.Group>
                  <Form.Label>
                     { this.state.message }
                  </Form.Label>
               </Form.Group>
            ) : (

               <ApplicationComponent {...this.props.application} />

            )}
         </Form.Group>
      );
   }
}
