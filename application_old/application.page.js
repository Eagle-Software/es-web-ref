import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

   save() {
      console.log("save")
   }

   render() {
      console.log(this.props)
      return (
         <Card>
            <Form>
               <Form.Group>
                  {this.props.currentUser ? (
                     <Link to="/application/prelim" >Start Application</Link>
                  ) : (
                     <div>
                        <Form.Group>
                        <Link to="/register" >You need to register and login first.</Link>
                        </Form.Group>
                     </div>
                  )}
               </Form.Group>
            </Form>
         </Card>
      );
   }
}
