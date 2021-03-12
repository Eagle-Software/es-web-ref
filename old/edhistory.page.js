import React, { Component } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import ApplicationService from "../../services/application.service"

import SchoolComponent from './school.component'
import AddressInputComponent from './address.input.component'

import { Formik } from 'formik'
import * as Yup from 'yup'

// Yup setup
const validationSchema = Yup.object().shape({

   school: Yup.string()
   .min(1, "Required")
   .max(50, "Too long")
   .required("Required"),

   address1: Yup.string().max(100, "Too long").required("Required"),
   address2: Yup.string().max(100, "Too long"),
   city: Yup.string().max(100, "Too long").required("Required"),
   state: Yup.string().max(100, "Too long").required("Required"),
   zip: Yup.number().required().positive().integer(),

   years: Yup.string()
   .min(1, "Required")
   .max(50, "Too long")
   .required("Required"),

   major: Yup.string()
   .min(1, "Required")
   .max(50, "Too long")
   .required("Required"),

   degrees: Yup.string()
   .min(1, "Required")
   .max(50, "Too long")
   .required("Required"),

   /*
   phone: Yup.string()
   .required("Primary phone number is required")
   .matches(
      /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/g,
      "Invalid phone number"
   ),
   */

})

const DefaultFormState = {
   school: "",
   years: "",
   major: "",
   degrees: "",
   address1: "",
   address2: "",
   city: "",
   state: "",
   zip: "",
};

export default class EducationHistoryPage extends Component {

   /* TODO: check user type for Applicant */

   constructor(props) {
      super(props)

      this.state = {
         message: "Loading",
         schools: []
      }

      // ApplicationService.clear()

   }

   componentDidMount() {
      /* load initial values from user application if it exists */
      ApplicationService.getSchools().then( (response) => {
         console.log(response)
         if (response) {
            if (response.data) {
               this.setState({
                  message: '',
                  schools: response.data
               })
            } else {
               /* no application started yet */
               this.setState({
                  message: ''
               })
            }
         } else {
            this.setState({
               message: 'Null response from server. Contact administrator.'
            })
         }
      }, (err) => {
         if (err) {
            if (err.response) {
               console.log(err.response)
               this.setState({
                  message: "Database service error, contact administrator."
               })
            } else {
               console.log(err)
               this.setState({
                  message: "Unable to connect to database. Try logging out and back in."
               })
            }
         }
      })
   }

   handleRemoveSchool = ( index ) => {
      console.log("handleRemoveSchool: " + index)
      this.setState({
         removing: index
      })
      ApplicationService.removeSchool(this.state.schools[index]._id).then(
         (response) => {
            if (response) {
               /* successfully removed from DB -> update state */
               var newArray = [...this.state.schools]
               newArray.splice(index, 1)
               this.setState({
                  removing: undefined,
                  schools: newArray
               })
            } else {
               this.setState({
                  message: "Remove returned a null response? Contact administrator."
               })
            }
         }, (error) => {
            this.setState({
               message: "Error removing school. Try logging out and back in again."
            })
         })
   }

   handleAddSchool = ( school, { resetForm } ) => {
      /* only pull out the values that we want? Is this necessary? */
      const newSchool = {
         school: school.school,
         address1: school.address1,
         address2: school.address2,
         city: school.city,
         state: school.state,
         zip: school.zip,
         years: school.years,
         major: school.major,
         degrees: school.degrees,
      }
      this.setState({
         message: "Adding school",
      })
      console.log("adding school")
      console.log(newSchool)

      ApplicationService.addSchool(newSchool).then(
         (response) => {
            if (response && response.data) {
               console.log('response')
               console.log(response)
               this.setState( prevState => ({
                  schools: [ ...prevState.schools, response.data.school],
                  message: '',
               }))
               resetForm();
            } else {
               this.setState({
                  message: 'Add returned a null response. Contact Administrator.'
               })
            }
         }, (error) => {
            console.log(error)
            this.setState({
               message: 'Error saving school'
            })
         }
      )
   }

   render() {
      console.log("render")
      console.log(this.state)
      return (

         <div>
               <Formik
                  enableReinitialize
                  onSubmit={this.handleAddSchool}
                  initialValues={DefaultFormState}
                  validationSchema={validationSchema} >

                  {({ handleSubmit, handleChange, values, errors, touched }) => (
                     <div>

                        <Form
                           noValidate
                           onSubmit={ handleSubmit } >

                           <Form.Group className='container' >

                              <Form.Label>
                                 <h5>Add an entry:</h5>
                              </Form.Label>

                              <Form.Group controlId="school" className='container' >
                                 <Form.Row className='align-items-baseline' >
                                    <Form.Label>School</Form.Label>
                                    <Form.Control
                                       onChange={ handleChange }
                                       isValid={ touched.school && !errors.school }
                                       isInvalid={ !!errors.school}
                                       value={ values.school }
                                       type="text" />
                                    <Form.Control.Feedback>
                                       { errors.school}
                                    </Form.Control.Feedback>
                                 </Form.Row>
                              </Form.Group>
                              <AddressInputComponent
                                 handleChange={ handleChange }
                                 values={ values }
                                 errors={ errors }
                                 touched={ touched }
                              />
                              <Form.Group controlId="years">
                                 <Form.Row className='align-items-baseline' >
                                    <Form.Label>Years completed</Form.Label>
                                    <Form.Control
                                       onChange={ handleChange }
                                       isValid={ touched.years && !errors.years }
                                       isInvalid={ !!errors.years }
                                       value={ values.years }
                                       type="text" />
                                    <Form.Control.Feedback>
                                       { errors.years }
                                    </Form.Control.Feedback>
                                 </Form.Row>
                              </Form.Group>
                              <Form.Group controlId="major">
                                 <Form.Row className='align-items-baseline' >
                                    <Form.Label>Course of study</Form.Label>
                                    <Form.Control
                                       onChange={ handleChange }
                                       isValid={ touched.major && !errors.major }
                                       isInvalid={ !!errors.major }
                                       value={ values.major }
                                       type="text" />
                                    <Form.Control.Feedback>
                                       { errors.major }
                                    </Form.Control.Feedback>
                                 </Form.Row>
                              </Form.Group>

                              <Form.Group controlId="degrees">
                                 <Form.Row className='align-items-baseline' >
                                    <Form.Label>Degrees/diploma earned</Form.Label>
                                    <Form.Control
                                       onChange={ handleChange }
                                       isValid={ touched.degrees && !errors.degrees }
                                       isInvalid={ !!errors.degrees }
                                       value={ values.degrees }
                                       type="text" />
                                    <Form.Control.Feedback>
                                       { errors.description }
                                    </Form.Control.Feedback>
                                 </Form.Row>
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

                        { this.state.schools.map( (school, i) => 
                           (
                              <div className='rounded border row align-items-center my-3 mx-4' key={ i }>
                                 <SchoolComponent className='col' { ...school }/>
                                 <div className='col-auto d-flex flex-column align-items-end' >
                                    <div className='pb-3' >
                                       <Button>
                                          Edit
                                       </Button>
                                    </div>
                                    <div>
                                       <Button onClick={ () => this.handleRemoveSchool(i) } >
                                          Remove
                                       </Button>
                                    </div>
                                 </div>
                              </div>
                           )
                        ) }

                     </div>
                  )}
               </Formik>
         </div>
      )
   }
}
