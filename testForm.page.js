import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Form as FForm, Field } from 'react-final-form'


export default class TestFormPage extends Component {

   constructor(props) {
      super(props)

      this.onSubmit = this.onSubmit.bind(this)
      this.validate = this.validate.bind(this)
   }

   onSubmit() {

   }

   validate (values) {
      const errors = {}
      if (true) {
         errors.firstName = 'Required'
      }
      console.dir(errors)
   }

   render() {
      return (
         <Container>

            <FForm
               onSubmit={this.onSubmit}
               validate={this.validate}
               render={ ({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                     <Field name="firstName">
                        {({ input, meta }) => (
                           <Form.Group controlId="firstName" >
                              <Form.Label>First Name</Form.Label>
                              <Form.Control {...input} type='text' placeholder="Fist Name" />
                              {console.dir(meta) && meta.error && meta.touched &&
                              <Form.Control.Feedback type="invalid" >{meta.error}</Form.Control.Feedback>}
                           </Form.Group>
                        )}
                     </Field>
                  </Form>
               ) }
            />

         </Container>
      )
   }

}
