import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import UserService from "../../services/user.service";

export default class CareersPage extends Component {
   constructor(props) {
      super(props);

      this.state = {
         content: ""
      };
   }

   componentDidMount() {
      UserService.getPublicContent().then(
         response => {
            this.setState({
               content: response.data
            });
         },
         error => {
            this.setState({
               content:
               (error.response && error.response.data) ||
               error.message ||
               error.toString()
            });
         }
      );
   }

   render() {
      return (
         <Card>
            <Form>
               <Form.Label>
               <h3>Application for Employment</h3>
                  <small>
                     Eagle Medical, Inc. is an equal opportuniry employer and does not unlawfully discriminate in employment. No question of this application is used for the purpose of limiting or excluding any applicant from consideration for employment on a basis prohibited by local, state, or federal law. Equal access to employment, services, and programs is available to all persons. Those applicants requiring reasonable accommodation to the application and/or interview process should notify a representative of the organization.
                  </small>
               </Form.Label>
            </Form>
         </Card>
      );
   }
}
