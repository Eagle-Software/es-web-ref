import React, { Component } from 'react'
import { Card, Container, Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import { Formik } from 'formik'
import * as Yup from 'yup'
import 'yup-phone'

/* Pages */
import PrelimPage from './prelim.page'
import EmplHistoryPage from './emplhistory.page'
import EdHistoryPage from './edhistory.page'
import ReferencesPage from './references.page'
import ReviewPage from './review.page'

const pages = [
   PrelimPage,
   EmplHistoryPage,
   EdHistoryPage,
   ReferencesPage,
   ReviewPage
]

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

   /* eslint-disable-next-line */
   celltel: Yup.string().phone('US', true, "${path} is not a valid phone number").required(),

   hometel: Yup.string()

})

export default class ApplicationPage extends Component {

   constructor(props) {
      super(props)

      this.state = {
         form: null,
         page: props.page || props.match.params.page || 0,
         message: '',
         defaultFormState: pages[props.page || props.match.params.page || 0].defaultFormState()
      }

      this.pageRef = React.createRef()

      this.back = this.back.bind(this)
      this.forward = this.forward.bind(this)
      this.save = this.save.bind(this)

   }

   componentDidMount() {
      /* load initial values from user application if it exists */
      this.setState({
         message: "loading",
      })

      this.pageRef.current.getDefaultFormState().then( (result) => {
         console.log(result)
         this.setState({
            message: "",
            defaultFormState: result
         })
      }, (error) => {
         this.setState({
            message: "error"
         })
      })

   }

   back() {
      console.log('back')
      this.setState({ page: this.state.page - 1 })
      this.save()
   }

   forward() {
      console.log('forward')
      this.setState({ page: this.state.page + 1 })
      this.save()
   }

   save() {
      console.log('save')
   }

   navigation = (back, forward) => (
      <Form.Group className='d-flex flex-wrap justify-content-between align-items-center container' >
         <Button className='float-left'
            type='submit'
            onClick={ back } >
            { '< Back' }
         </Button>

         <Button className='float-right'
            type='submit'
            onClick={ forward } >
            { 'Forward >' }
         </Button>

      </Form.Group>
   )

   handleSubmit = (form) => {

      console.log('handleSubmit (application)')
      console.log(form)
      this.setState({
         message: 'Submitting'
      })

      this.pageRef.current.handleSubmit(form)

   }

   render() {
      if (!this.props.currentUser) {
         return <Redirect to='/login' />
      } else {
         var CurrentPage = pages[this.state.page]
         return (
            <Container>
               { this.state.message !== '' && this.state.message }
               { this.navigation(this.back, this.forward) }
               <Card>

                  <Card.Body>
                     <Formik
                        enableReinitialize
                        onSubmit={ this.handleSubmit }
                        initialValues={ this.state.defaultFormState }
                        validationSchema={ validationSchema } >
                        { ({ handleSubmit, handleChange, values, errors, touched }) => (

                           <Form
                              noValidate
                              onSubmit={ handleSubmit } >


                              <Form.Group>
                                 <Form.Label>
                                    <h4>Application for Employment (Hourly)</h4>
                                 </Form.Label>
                                 <Form.Text muted className='mx-2' >
                                    Eagle Medical, Inc. is an equal opportunity employer and does not unlawfully discriminate in employment. No question of this application is used for the purpose of limiting of excluding any applicant from consideration for employment on a basis prohibited by local, state, or federal law. Equal access to employment, service, and programs is available to all persons. Those applicants requiring reasonable accomodation to the application and/or interview process should notify a representative of the organization.
                                 </Form.Text>
                              </Form.Group>

                              <CurrentPage
                                 ref={ this.pageRef }
                                 values={ values }
                                 errors={ errors }
                                 touched={ touched }
                                 handleChange={ handleChange }
                                 form={ this.state.form } />

                              <Button type='submit' >Submit</Button>

                           </Form>

                        ) }
                     </Formik>
                  </Card.Body>

               </Card>
               { this.navigation(this.back, this.forward) }
            </Container>
         )
      }
   }

}

