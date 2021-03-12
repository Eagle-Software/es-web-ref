import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import FormService from "../../services/form.service"

import UserService from "../../services/user.service";
import UsStateSel from "../../components/usStateSel.component";

import { Formik } from 'formik';
import * as Yup from 'yup';

import us from "us";

const ANSWER_ROWS = 2;
const ANSWER_MAX_LEN = 280;

// Yup setup
const validationSchema = Yup.object().shape({
});

export default class FormPage extends Component {

   /* TODO: add 'loading...' functionality */

   constructor(props) {
      super(props);
      this.state = {
         formKey: "application",
         loading: false,
         message: ""
      };
      this.questions = FormService.get(this.state.formKey);
      console.log(this.questions);
      this.defaultFormState = {};
   }

   handleSubmit = (form) => {
      this.setState({
         message: "Submitting",
         loading: true
      });
      console.log(form);
      FormService.submit(form).then(
         () => {
            // Success!
            alert("SUCCESS")
         }, error => {
            alert("ERRROR")
            const resMessage =
               (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
               error.message ||
               error.toString();

            this.setState({
               loading: false,
               message: resMessage

            });
         }
      );
   }

   render() {
      return (

         <Formik
            onSubmit={this.handleSubmit}
            initialValues={this.defaultFormState}
            validationSchema={validationSchema}
         >

            {({ handleSubmit, handleChange, values, errors, touched }) => (

               <Form
                  noValidate
                  onSubmit={ handleSubmit } >

                  <Form.Group>
                     <Form.Label>
                        <h4>{this.state.formKey}</h4>
                     </Form.Label>
                  </Form.Group>

                  { this.questions ? this.questions.map((value, index) => {
                     return (
                        <Form.Group controlId={ index }>
                           <Form.Label>{ value.prompt }</Form.Label>
                           <Form.Control
                              as="textarea"
                              maxLength={ANSWER_MAX_LEN}
                              rows={ANSWER_ROWS}
                              onChange={handleChange} />
                           <Form.Control.Feedback>
                              { errors["" + index] }
                           </Form.Control.Feedback>
                        </Form.Group>
                     );
                  }) : (
                     <h4>LOADING</h4>
                  )}

                  <Button type="submit">
                     <span>
                        Save and continue
                     </span>
                  </Button>

               </Form>

            )}
         </Formik>
      );
   }
}
