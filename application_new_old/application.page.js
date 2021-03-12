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

   save() {
      console.log("save")
   }

   render() {
      console.log("User")
      console.dir(this.props)
      return (
         <Card>
            <Form>
               <Form.Group>
                  {this.props.currentUser ? (
                     <Link to="/forms/application/prelim" >Start Application</Link>
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
