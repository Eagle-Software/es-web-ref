import React, { Component } from "react";
import { Container, Carousel } from "react-bootstrap";

import UserService from "../services/user.service";

export default class Template extends Component {
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
         <Container className="d-flex justify-content-center">
            TODO
         </Container>
      );
   }
}
