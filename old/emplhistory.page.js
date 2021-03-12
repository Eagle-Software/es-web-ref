import React, { Component } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import ApplicationService from "../../services/application.service"

import EmployerComponent from './employer.component'
import AddressInputComponent from './address.input.component'

import { Formik } from 'formik'
import * as Yup from 'yup'

const ANSWER_MAX_LEN = 280

// Yup setup
const validationSchema = Yup.object().shape({

   employer: Yup.string()
   .min(1, "Required")
   .max(50, "Too long")
   .required("Required"),

   supervisor: Yup.string()
   .min(1, "Required")
   .max(50, "Too long")
   .required("Required"),

   position: Yup.string()
   .min(1, "Required")
   .max(50, "Too long")
   .required("Required"),

   description: Yup.string()
   .min(1, "Required")
   .max(ANSWER_MAX_LEN, "Too long")
   .required("Required"),

   salary: Yup.string()
   .min(1, "Required")
   .max(ANSWER_MAX_LEN, "Too long")
   .required("Required"),

   start: Yup.date(),

   end: Yup.date(),

   reason: Yup.string()
   .min(1, "Required")
   .max(ANSWER_MAX_LEN, "Too long")
   .required("Required"),

   address1: Yup.string().max(100, "Too long").required("Required"),
   address2: Yup.string().max(100, "Too long"),
   city: Yup.string().max(100, "Too long").required("Required"),
   state: Yup.string().max(100, "Too long").required("Required"),
   zip: Yup.number().required().positive().integer(),

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
   employer: "",
   supervisor: "",
   position: "",
   description: "",
   salary: "",
   start: "",
   end: "",
   reason: "",
   address1: "",
   address2: "",
   city: "",
   state: "",
   zip: "",
   phone: ""
}

export default class EmployeeHistoryPage extends Component {

   /* TODO: check user type for Applicant */

   constructor(props) {
      super(props)

      this.state = {
         defaultFormState: DefaultFormState
      }
   }

   /* static public getters */

   static validationSchema = () => {
      return validationSchema
   }

   static defaultFormState = () => {
      return DefaultFormState
   }

   /* Run to retrieve the initial state, loading if necessary */
   getDefaultFormState() {
      /* load initial values from user application if it exists */
      return new Promise( (resolve, reject) => {
         ApplicationService.getEmployers().then( (response) => {
            console.log(response)
            if (response) {
               if (response.data) {
                  resolve(response.data)
               } else {
                  /* no application started yet */
                  resolve(null)
               }
            } else {
               reject( {message: 'Null response from server. Contact administrator.'} )
            }
         }, (err) => {
            if (err) {
               if (err.response) {
                  reject ( {message: "Database service error, contact administrator." } )
               } else {
                  reject ( {message: "Unable to connect to database. Try logging out and back in."} )
               }
            }
         })
      })
   }

   handleRemoveEmployer = ( index ) => {
      console.log("handleRemoveEmployer")
      this.setState({
         message: 'Removing employer'
      })
      ApplicationService.removeEmployer(this.state.employers[index]._id).then(
         (response) => {
            if (response) {
               /* successfully removed from DB -> update state */
               var newArray = [...this.state.employers]
               newArray.splice(index, 1)
               this.setState({
                  message: '',
                  employers: newArray
               })
            } else {
               this.setState({
                  message: "remove returned a null response? Contact administrator."
               })
            }
         }, (error) => {
            this.setState({
               message: "Error removing employer. Try logging out and back in again."
            })
         })
   }

   handleSubmit = (form) => {
      /* Doesn't need to submit because handleAddEmployer and handleRemoveEmployer
       * access ApplicationService, and therefore the DB, directly. */
      return null
   }

   handleAddEmployer = (employer) => {
      /* only pull out the values that we want? Is this necessary? */
      const newEmployer = {
         employer: employer.employer,
         supervisor: employer.supervisor,
         position: employer.position,
         description: employer.description,
         salary: employer.salary,
         start: employer.start,
         end: employer.end,
         reason: employer.reason,
         address1: employer.address1,
         address2: employer.address2,
         city: employer.city,
         state: employer.state,
         zip: employer.zip,
         tel: employer.phone
      }
      ApplicationService.addEmployer(newEmployer).then(
         (response) => {
            if (response) {

               console.log(this.props.values.employers)
               console.log(response.data.employer)


               this.props.handleChange(response.data.employer)

            } else {
               this.setState({
                  message: 'Add returned a null response. Contact Administrator.'
               })
            }
         }, (error) => {
            console.log(error)
            this.setState({
               message: 'Error saving employer'
            })
         }
      )
   }

   render() {
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
                  onSubmit={this.handleAddEmployer}
                  initialValues={DefaultFormState}
                  validationSchema={validationSchema} >

                  {({ handleSubmit, handleChange, values, errors, touched }) => (
                     <div>

                        <Form
                           noValidate
                           onSubmit={ handleSubmit } >

                           <Form.Group>

                              <Form.Label>
                                 <h5>Add an entry</h5>
                              </Form.Label>

                              <Form.Group controlId="employer">
                                 <Form.Row className='align-items-baseline' >
                                    <Form.Label className='col-auto' >Employer</Form.Label>
                                    <Form.Control
                                       className='col ml-2'
                                       onChange={ handleChange }
                                       isValid={ touched.employer && !errors.employer }
                                       isInvalid={ !!errors.employer}
                                       value={ values.employer }
                                       type="text" />
                                    <Form.Control.Feedback>
                                       { errors.employer}
                                    </Form.Control.Feedback>
                                 </Form.Row>
                              </Form.Group>
                              <AddressInputComponent
                                 handleChange={ handleChange }
                                 values={ values }
                                 errors={ errors }
                                 touched={ touched }
                              />
                              <Form.Group controlId='supervisor' >
                                 <Form.Row className='align-items-baseline' >
                                    <Form.Label className='col-auto' >Supervisor</Form.Label>
                                    <Form.Control
                                       className='col ml-2'
                                       onChange={ handleChange }
                                       isValid={ touched.supervisor && !errors.supervisor }
                                       isInvalid={ !!errors.supervisor }
                                       value={ values.supervisor }
                                    />
                                 </Form.Row>
                              </Form.Group>
                              <Form.Group controlId="position">
                                 <Form.Row className='align-items-baseline' >
                                    <Form.Label className='col-auto' >Position held</Form.Label>
                                    <Form.Control
                                       className='col ml-2'
                                       onChange={ handleChange }
                                       isValid={ touched.position && !errors.position }
                                       isInvalid={ !!errors.position }
                                       value={ values.position }
                                       type="text" />
                                    <Form.Control.Feedback>
                                       { errors.position }
                                    </Form.Control.Feedback>
                                 </Form.Row>
                              </Form.Group>

                              <Form.Group controlId="description">
                                 <Form.Row className='align-items-baseline' >
                                    <Form.Label>Job summary</Form.Label>
                                    <Form.Control
                                       as='textarea'
                                       onChange={ handleChange }
                                       isValid={ touched.description && !errors.description }
                                       isInvalid={ !!errors.description }
                                       value={ values.description }
                                       type="text" />
                                    <Form.Control.Feedback>
                                       { errors.description }
                                    </Form.Control.Feedback>
                                 </Form.Row>
                              </Form.Group>

                              <Form.Group controlId="salary">
                                 <Form.Row className='align-items-baseline' >
                                    <Form.Label className='col-auto' >Salary</Form.Label>
                                    <Form.Control
                                       className='col ml-2'
                                       onChange={ handleChange }
                                       isValid={ touched.salary && !errors.salary }
                                       isInvalid={ !!errors.salary }
                                       value={ values.salary }
                                       type="text" />
                                    <Form.Control.Feedback>
                                       { errors.salary }
                                    </Form.Control.Feedback>
                                 </Form.Row>
                              </Form.Group>

                              <Form.Group>
                                 <Form.Row>
                                    <Form.Group className='col' controlId="start">
                                       <Form.Label>Start date</Form.Label>
                                       <Form.Control
                                          onChange={ handleChange }
                                          isValid={ touched.start && !errors.start }
                                          isInvalid={ !!errors.start }
                                          value={ values.start }
                                          type="date" />
                                       <Form.Control.Feedback>
                                          { errors.start }
                                       </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className='col' controlId="end">
                                       <Form.Label>End date</Form.Label>
                                       <Form.Control
                                          onChange={ handleChange }
                                          isValid={ touched.end && !errors.end }
                                          isInvalid={ !!errors.end }
                                          value={ values.end }
                                          type="date" />
                                       <Form.Control.Feedback>
                                          { errors.end }
                                       </Form.Control.Feedback>
                                    </Form.Group>
                                 </Form.Row>
                              </Form.Group>

                              <Form.Group controlId="reason">
                                 <Form.Row className='align-items-baseline' >
                                    <Form.Label>Reason for leaving</Form.Label>
                                    <Form.Control
                                       as='textarea'
                                       onChange={ handleChange }
                                       isValid={ touched.reason && !errors.reason }
                                       isInvalid={ !!errors.reason }
                                       value={ values.reason }
                                       type="text" />
                                    <Form.Control.Feedback>
                                       { errors.reason }
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

                        { this.state.employers.map( (employer, i) => 
                           (
                              <div key={ i } className='rounded border row align-items-center my-3 mx-4' >
                                 <EmployerComponent className='col' { ...employer } />
                                 <div className='col-auto d-flex flex-column align-items-end'>
                                    <div className='pb-3' >
                                       <Button>
                                          Edit
                                       </Button>
                                    </div>
                                    <div>
                                       <Button onClick={ () => this.handleRemoveEmployer(i) } >
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
            )}
         </div>
      )
   }
}
