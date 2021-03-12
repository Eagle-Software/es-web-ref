import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { Formik, Form as FForm } from 'formik';
import * as Yup from 'yup';

/* Page that loads form from DB based on the formKey prop */
export default class FormPage extends Component {

   constructor(props) {
      super(props);

      this.state = {
         message: ""
      }

      this.validationSchema = {

      }

      this.initialValues = {

      }

      this.handleSubmit = this.handleSubmit.bind(this);

   }

   handleSubmit(form) {
      this.setState({
         message: "Submitting",
      });
      console.log("handleSubmit");
      console.log(form);

      /* Do something with form */

   }

   render() {
      return (
         <Formik
            onSubmit={ this.handleSubmit }
            initialValues={ this.initialValues }
            validationSchema={ this.validationSchema } >

            <Card className="mx-4" >

               { this.state.message != "" ? (
                  <Form.Label>{ this.state.message }</Form.Label>
               ) : ( !this.state.form ? (
                  <Form.Label>{ "Form is not loaded" }</Form.Label>
               ) : (

                  <Form
                     as={ FForm, Card }
                     onSubmit={ this.handleSubmit }
                     noValidate >

                     <Form.Group>
                        <Form.Label>
                           { this.state.title || "<title>" }
                        </Form.Label>
                        { this.state.description && (
                           <Form.Text as="small" >
                              { this.state.description }
                           </Form.Text>
                        )}
                     </Form.Group>

                     { this.state.form.map((value, index) => {(
                        <Form.Group>
                           <Form.Label>
                           </Form.Label>
                           <Form.Control
                              as="" >
                           </Form.Control>
                        </Form.Group>
                     )})}

                  </Form>
               ))}
            </Card>
         </Formik>
      );
   }
}
