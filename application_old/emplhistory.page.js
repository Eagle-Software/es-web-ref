import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import UserService from "../../services/user.service";

export default class CareersPage extends Component {
   constructor(props) {
      super(props);
      this.save = this.save.bind(this);


      this.state = {
         content: ""
      };

   }


   save(e) {
      e.preventDefault();
      window.location.replace("/application/edhistory");
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
         <Form>
            <Form.Group>
               <Form.Label>
                  <h4>Employment History</h4>
               </Form.Label>
            </Form.Group>
            <Form.Group>
               <Button disabled={this.state.loading} onClick={this.save} >
                  Save and continue to Education
               </Button>
            </Form.Group>
         </Form>
      );
   }
}
