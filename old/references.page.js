import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ApplicationService from "../../services/application.service"

import ReferenceComponent from './reference.component';

import { Formik } from 'formik';
import * as Yup from 'yup';

// Yup setup
const validationSchema = Yup.object().shape({

   name: Yup.string()
   .min(1, "Required")
   .max(50, "Too long")
   .required("Required"),

   relation: Yup.string()
   .min(1, "Required")
   .max(50, "Too long")
   .required("Required"),

   tel: Yup.string()
   .min(1, "Required")
   .max(50, "Too long")
   .required("Required"),

});

const DefaultFormState = {
   name: "",
   relation: "",
   tel: "",
};

export default class ReferencesPage extends Component {

   /* TODO: check user type for Applicant */

   constructor(props) {
      super(props);

      this.state = {
         message: "Loading",
         references: []
      };

      // ApplicationService.clear();

   }

   componentDidMount() {
      /* load initial values from user application if it exists */
      ApplicationService.getReferences().then( (response) => {
         console.log(response);
         if (response) {
            if (response.data) {
               this.setState({
                  message: '',
                  references: response.data
               });
            } else {
               /* no application started yet */
               this.setState({
                  message: ''
               });
            }
         } else {
            this.setState({
               message: 'Null response from server. Contact administrator.'
            });
         }
      }, (err) => {
         if (err) {
            if (err.response) {
               console.log(err.response);
               this.setState({
                  message: "Database service error, contact administrator."
               });
            } else {
               console.log(err);
               this.setState({
                  message: "Unable to connect to database. Try logging out and back in."
               });
            }
         }
      });
   }

   handleRemoveReference = ( index ) => {
      console.log("handleRemoveReference");
      this.setState({
         message: 'Removing reference'
      });
      ApplicationService.removeReference(this.state.references[index]._id).then(
         (response) => {
            if (response) {
               /* successfully removed from DB -> update state */
               var newArray = [...this.state.references];
               newArray.splice(index, 1);
               this.setState({
                  message: '',
                  references: newArray
               });
            } else {
               this.setState({
                  message: "remove returned a null response? Contact administrator."
               });
            }
         }, (error) => {
            this.setState({
               message: "Error removing reference. Try logging out and back in again."
            });
         });
   }

   handleAddReference = (reference) => {
      /* only pull out the values that we want? Is this necessary? */
      const newReference = {
         name: reference.name,
         relation: reference.relation,
         tel: reference.tel
      }
      this.setState({
         message: "Adding reference",
      });
      console.log("adding reference");
      console.log(newReference);

      ApplicationService.addReference(newReference).then(
         (response) => {
            if (response) {
               console.log('response');
               console.log(response);
               this.setState( prevState => ({
                  references: [ ...prevState.references, response.data.reference],
                  message: '',
               }));
            } else {
               this.setState({
                  message: 'Add returned a null response. Contact Administrator.'
               });
            }
         }, (error) => {
            console.log(error);
            this.setState({
               message: 'Error saving reference'
            });
         }
      );
   }

   render() {
      console.log("render");
      console.log(this.state);
      return (

         <div>
            { this.state.message !== "" ? (
               <Form.Group>
                  <Form.Label>
                     { this.state.message }
                  </Form.Label>
               </Form.Group>
            ) : (
               <Formik
                  enableReinitialize
                  onSubmit={this.handleAddReference}
                  initialValues={DefaultFormState}
                  validationSchema={validationSchema} >

                  {({ handleSubmit, handleChange, values, errors, touched }) => (
                     <div>

                        <Form
                           noValidate
                           onSubmit={ handleSubmit } >

                           <Form.Group>

                              <Form.Group controlId="name">
                                 <Form.Label>Name</Form.Label>
                                 <Form.Control
                                    onChange={ handleChange }
                                    isValid={ touched.name && !errors.name }
                                    isInvalid={ !!errors.name }
                                    value={ values.name }
                                    type="text" />
                                 <Form.Control.Feedback>
                                    { errors.name }
                                 </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group controlId="tel">
                                 <Form.Label>Phone number</Form.Label>
                                 <Form.Control
                                    name="tel"
                                    onChange={handleChange}
                                    autoComplete="tel"
                                    isValid={ touched.tel && !errors.tel }
                                    isInvalid={ !!errors.tel }
                                    value={ values.tel }
                                    type="tel"
                                 />
                                 <Form.Control.Feedback>
                                    { errors.tel }
                                 </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group controlId="relation">
                                 <Form.Label>Relationship</Form.Label>
                                 <Form.Control
                                    onChange={ handleChange }
                                    isValid={ touched.relation && !errors.relation }
                                    isInvalid={ !!errors.relation }
                                    value={ values.relation }
                                    type="text" />
                                 <Form.Control.Feedback>
                                    { errors.relation }
                                 </Form.Control.Feedback>
                              </Form.Group>
                           </Form.Group>

                           <Form.Group>
                              <Button type="submit">
                                 <span>
                                    Save and add another
                                 </span>
                              </Button>
                           </Form.Group>
                        </Form>

                        { this.state.references.map( (reference, i) => 
                           (
                              <Form.Row key={ i } className='border rounded p-3 justify-content-center align-items-center' >
                                 <ReferenceComponent className='col' { ...reference } />
                                 <div className='col-auto d-flex align-items-stretch justify-content-center' >
                                    <Button className='mx-1' >
                                       Edit
                                    </Button>
                                    <Button className='mx-1' onClick={ () => this.handleRemoveReference(i) } >
                                       Remove
                                    </Button>
                                 </div>
                              </Form.Row>
                           )
                        ) }

                     </div>
                  )}
               </Formik>
            )}
         </div>
      );
   }
}
