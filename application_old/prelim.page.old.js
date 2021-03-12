import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import FormService from "../../services/Form.service"

import UserService from "../../services/user.service";
import UsStateSel from "../../components/usStateSel.component";

import { Formik } from 'formik';
import * as Yup from 'yup';

import us from "us";

const ANSWER_ROWS = 2;
const ANSWER_MAX_LEN = 280;

// Yup setup
const validationSchema = Yup.object().shape({

   fname: Yup.string()
   .min(1, "Required")
   .max(50, "Too long")
   .required("Required"),

   lname: Yup.string()
   .min(1, "Required")
   .max(50, "Too long")
   .required("Required"),

   address1: Yup.string().max(100, "Too long").required("Required"),
   address2: Yup.string().max(100, "Too long"),
   city: Yup.string().max(100, "Too long").required("Required"),
   state: Yup.string().max(100, "Too long").required("Required"),
   zip: Yup.number().required().positive().integer(),

   celltel: Yup.string()
   .required("Primary phone number is required")
   .matches(
      /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/g,
      "Invalid phone number"
   ),

   hometel: Yup.string()
   .matches(
      /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/g,
      "Invalid phone number"
   )

});

export default class PrelimPage extends Component {

   /* TODO: add 'loading...' functionality */

   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         message: ""
      };
   }

   /*
    * TODO: load in previous values if already completed an application
    */

   defaultFormState = {
      fname: "",
      lname: "",
      address1: "",
      address2: "",
      city: "",
      state: "CA",
      zip: "",
      celltel: "",
      hometel: "",
   };

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
                        <h4>Personal Information</h4>
                        <h4>{this.props.message}</h4>
                     </Form.Label>

                     <Form.Row>
                        <Form.Group controlId="fname">
                           <Form.Label>First name</Form.Label>
                           <Form.Control
                              name="fname"
                              onChange={ handleChange }
                              autoComplete="given-name"
                              isValid={ touched.fname && !errors.fname }
                           isInvalid={ !!errors.fname }
                              value={ values.fname }
                              type="text"
                              placeholder="First name"/>
                           <Form.Control.Feedback>
                              { errors.fname }
                           </Form.Control.Feedback>

                        </Form.Group>
                        <Form.Group controlId="lname">
                           <Form.Label>Last name</Form.Label>
                           <Form.Control
                              name="lname"
                              onChange={handleChange}
                              autoComplete="family-name"
                              isValid={ touched.lname && !errors.lname }
                           isInvalid={ !!errors.lname }
                              value={ values.lname }
                              type="text"
                              placeholder="Last name"/>
                           <Form.Control.Feedback>
                              {errors.lname}
                           </Form.Control.Feedback>
                        </Form.Group>
                     </Form.Row>
                     <Form.Group controlId="address1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                           name="address1"
                           onChange={handleChange}
                           autoComplete="address-line1"
                           isValid={ touched.address1 && !errors.address1 }
                           isInvalid={ !!errors.address1 }
                           value={ values.address1 }
                           type="text"
                           placeholder="1234 Main St." />
                        <Form.Control.Feedback>
                           {errors.address1}
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Group controlId="address2">
                        <Form.Control
                           name="address2"
                           onChange={handleChange}
                           disabled={ !values.address1 }
                           autoComplete="address-line2"
                           isValid={ touched.address2 && !errors.address2 }
                           isInvalid={ !!errors.address2 }
                           value={ values.address2 }
                           type="text"
                           placeholder="Apartment, studio, floor" />
                        <Form.Control.Feedback>
                           {errors.address2}
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Row>
                        <Form.Group controlId="city">
                           <Form.Label>City</Form.Label>
                           <Form.Control
                              name="city"
                              onChange={handleChange}
                              autoComplete="address-level2"
                              isValid={ touched.city && !errors.city }
                           isInvalid={ !!errors.city }
                              value={ values.city }
                              type="text"
                              placeholder="City" />
                           <Form.Control.Feedback>
                              {errors.city}
                           </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="state">
                           <Form.Label>State</Form.Label>
                           <Form.Control
                              onChange={handleChange}
                              name="state"
                              autoComplete="address-level1"
                              isValid={ touched.state && !errors.state }
                           isInvalid={ !!errors.state }
                              value={ values.state }
                              as="select"
                              defaultValue={ values.state }>
                              { us.STATES.map((value, index) => {
                                 return <option key={value.abbr} value={value.abbr}>{value.abbr}</option>
                              })
                              }
                           </Form.Control>
                           <Form.Control.Feedback>
                              {errors.state}
                           </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="zip">
                           <Form.Label>Zip Code</Form.Label>
                           <Form.Control
                              name="zip"
                              onChange={handleChange}
                              autoComplete="postal-code"
                              isValid={ touched.zip && !errors.zip }
                           isInvalid={ !!errors.zip }
                              value={ values.zip }
                              type="number"
                              placeholder="Zip" />
                           <Form.Control.Feedback>
                              {errors.zip}
                           </Form.Control.Feedback>
                        </Form.Group>
                     </Form.Row>
                     <Form.Row>
                        <Form.Group controlId="celltel">
                           <Form.Label>Primary phone</Form.Label>
                           <Form.Control
                              name="celltel"
                              onChange={handleChange}
                              autoComplete="tel"
                              isValid={ touched.celltel && !errors.celltel }
                           isInvalid={ !!errors.celltel }
                              value={ values.celltel }
                              type="tel"
                              placeholder="(###) ###-####"
                           />
                           <Form.Control.Feedback>
                              {errors.celltel}
                           </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="hometel">
                           <Form.Label>Secondary phone</Form.Label>
                           <Form.Control
                              name="hometel"
                              onChange={handleChange}
                              disabled={ !values.celltel }
                              autoComplete="tel"
                              isValid={ touched.hometel && !errors.hometel }
                              isInvalid={ !!errors.hometel }
                              value={ values.hometel }
                              type="tel"
                              size="20"
                              minLength="10"
                              maxLength="10"
                              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                              placeholder="(###) ###-####"
                           />
                           <Form.Control.Feedback>
                              {errors.hometel}
                           </Form.Control.Feedback>
                        </Form.Group>

                     </Form.Row>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label><h4>Preliminary Questions</h4></Form.Label>
                     <Form.Group controlId="positions">
                        <Form.Label>Position(s) applied for or type of work desired?</Form.Label>
                        <Form.Control
                           as="textarea"
                           maxLength={ANSWER_MAX_LEN}
                           rows={ANSWER_ROWS}
                           onChange={handleChange}
                           type="textarea"
                           placeholder="" />
                        <Form.Control.Feedback>
                           {errors.positions}
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Group controlId="empltype">
                        <Form.Label>Type of employment desired (full, part, temp)</Form.Label>
                        <Form.Control
                           as="textarea"
                           maxLength={ANSWER_MAX_LEN}
                           rows={ANSWER_ROWS}
                           onChange={handleChange}
                           type="textarea"
                           placeholder="" />
                        <Form.Control.Feedback>
                           {errors.empltype}
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Group controlId="startdate">
                        <Form.Label>When can you start work?</Form.Label>
                        <Form.Control
                           as="textarea"
                           maxLength={ANSWER_MAX_LEN}
                           rows={ANSWER_ROWS}
                           onChange={handleChange}
                           type="textarea"
                           placeholder="" />
                        <Form.Control.Feedback>
                           {errors.startdate}
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Group controlId="attendance">
                        <Form.Label>Are you able to meet the attendance requirements?</Form.Label>
                        <Form.Control
                           as="textarea"
                           maxLength={ANSWER_MAX_LEN}
                           rows={ANSWER_ROWS}
                           onChange={handleChange}
                           type="textarea"
                           placeholder="" />
                        <Form.Control.Feedback>
                           {errors.attendance}
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Group controlId="overtime">
                        <Form.Label>Do you have any objection to working overtime if necessary?</Form.Label>
                        <Form.Control
                           as="textarea"
                           maxLength={ANSWER_MAX_LEN}
                           rows={ANSWER_ROWS}
                           onChange={handleChange}
                           type="textarea"
                           placeholder="" />
                        <Form.Control.Feedback>
                           {errors.overtime}
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Group controlId="travel">
                        <Form.Label>Can you travel if required by this position?</Form.Label>
                        <Form.Control
                           as="textarea"
                           maxLength={ANSWER_MAX_LEN}
                           rows={ANSWER_ROWS}
                           onChange={handleChange}
                           type="textarea"
                           placeholder="" />
                        <Form.Control.Feedback>
                           {errors.travel}
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Group controlId="prevemployed">
                        <Form.Label>have you been previously employed by our organization?</Form.Label>
                        <Form.Control
                           as="textarea"
                           maxLength={ANSWER_MAX_LEN}
                           rows={ANSWER_ROWS}
                           onChange={handleChange}
                           type="textarea"
                           placeholder="" />
                        <Form.Control.Feedback>
                           {errors.prevemployed}
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Group controlId="emplauthorization">
                        <Form.Label>Can you submit proof of legal employment authorization and identity?</Form.Label>
                        <Form.Control
                           as="textarea"
                           maxLength={ANSWER_MAX_LEN}
                           rows={ANSWER_ROWS}
                           onChange={handleChange}
                           type="textarea"
                           placeholder="" />
                        <Form.Control.Feedback>
                           {errors.emplauthorization}
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Group controlId="workpermit">
                        <Form.Label>If you are under 18, can you furnish a work permit if it is required?</Form.Label>
                        <Form.Control
                           as="textarea"
                           maxLength={ANSWER_MAX_LEN}
                           rows={ANSWER_ROWS}
                           onChange={handleChange}
                           type="textarea"
                           placeholder="" />
                        <Form.Control.Feedback>
                           {errors.workpermit}
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Group controlId="crime">
                        <Form.Label>Have you been convicted of a crime in the last 7 years?</Form.Label>
                        <Form.Control
                           as="textarea"
                           maxLength={ANSWER_MAX_LEN}
                           rows={ANSWER_ROWS}
                           onChange={handleChange}
                           type="textarea"
                           placeholder="" />
                        <Form.Control.Feedback>
                           {errors.crime}
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Group controlId="crimeexplanation">
                        <Form.Label>If yes, please explain (a conviction will not automatically bar employment)</Form.Label>
                        <Form.Control
                           as="textarea"
                           maxLength={ANSWER_MAX_LEN}
                           rows={ANSWER_ROWS}
                           onChange={handleChange}
                           type="textarea"
                           placeholder="" />
                        <Form.Control.Feedback>
                           {errors.crimeexplanation}
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Group controlId='dlnumber'>
                        <Form.Label>Driver's license number (if driving is an essential job duty)</Form.Label>
                        <Form.Control
                           as="textarea"
                           maxLength={ANSWER_MAX_LEN}
                           rows={ANSWER_ROWS}
                           onChange={handleChange}
                           type="textarea"
                           placeholder="" />
                        <Form.Control.Feedback>
                           {errors.dlnumber}
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Form.Group controlId="referred">
                        <Form.Label>How were you referred to us?</Form.Label>
                        <Form.Control
                           as="textarea"
                           maxLength={ANSWER_MAX_LEN}
                           rows={ANSWER_ROWS}
                           onChange={handleChange}
                           type="textarea"
                           placeholder="" />
                        <Form.Control.Feedback>
                           {errors.referred}
                        </Form.Control.Feedback>
                     </Form.Group>
                  </Form.Group>
                  <Button type="submit">
                     <span>
                        Save and continue to Employment History
                     </span>
                  </Button>
               </Form>
            )}
         </Formik>
      );
   }
}
