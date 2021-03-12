import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { Card, Col, Row } from 'react-bootstrap'
// import Form from "react-validation/build/form"
// import Input from "react-validation/build/input"
// import CheckButton from "react-validation/build/button"
import AuthService from "../services/auth.service"
import { isEmail } from "validator"

const required = value => {
   if (!value) {
      return (
         <div className="alert alert-danger" role="alert">
            This field is required!
         </div>
      )
   }
}

const email = value => {
   if (!isEmail(value)) {
      return (
         <div className="alert alert-danger" role="alert">
            This is not a valid email.
         </div>
      )
   }
}

export default class LoginPage extends Component {

   constructor(props) {
      super(props)
      this.handleLogin = this.handleLogin.bind(this)
      this.onChangeEmail = this.onChangeEmail.bind(this)
      this.onChangePassword = this.onChangePassword.bind(this)
      this.register = this.register.bind(this)

      this.state = {
         email: "",
         password: "",
         loading: false,
         message: ""
      }

   }

   register() {
      this.setState({
         loading: true
      });
      window.location.replace('/register')
   }

   onChangeEmail(e) {
      this.setState({
         email: e.target.value
      })
   }

   onChangePassword(e) {
      this.setState({
         password: e.target.value
      })
   }

   handleLogin(e) {
      e.preventDefault()

      // set state to loading
      this.setState({
         message: "",
         loading: true
      })

      // Should already be validated but just double check
      this.form.validateAll()

      // If there were no errors reported
      if (this.checkBtn.context._errors.length === 0) {
         // Try logging in
         AuthService.login(this.state.email, this.state.password).then(
            () => {
               // Success?
               this.props.onUserChange()
               // redirect to profile page axios?
            },
            // Error
            error => {
               const resMessage =
                  (error.response &&
                     error.response.data &&
                     error.response.data.message) ||
                  error.message ||
                  error.toString()

               this.setState({
                  loading: false,
                  message: resMessage
               })
            }
         )
      } else {
         this.setState({
            loading: false
         })
      }
   }

   render() {
      const { currentUser } = this.props
      // If there is a user logged in (they should never land on this page)
      if (currentUser) {
         // Redirect to profile page
         // this.props.history.push("/profile")
         // window.location.reload()
         return ( <Redirect to="/user" /> )
      }

      return (
         <div>
            <Row className="justify-content-center" >
               <Card className="shadow" >
                  <Card.Body>
                     <span className='h1' >
                        Coming Soon!
                     </span>
                     {/*
                  <Form
                     onSubmit={this.handleLogin}
                     ref={c => {
                        this.form = c
                     }}
                  >
                     <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input
                           type="text"
                           className="form-control"
                           name="email"
                           value={this.state.email}
                           onChange={this.onChangeEmail}
                           validations={[required, email]}
                        />
                     </div>

                     <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                           type="password"
                           className="form-control"
                           name="password"
                           value={this.state.password}
                           onChange={this.onChangePassword}
                           validations={[required]}
                        />
                     </div>
                     <div className="form-group text-center">
                        <small className="form-text">
                           Testing username and password is 'test@gmail.com' and 'soarsoar'
                        </small>
                     </div>

                     <div className="form-group d-flex flex-col">
                        <button
                           className="btn btn-primary mx-auto"
                           disabled={this.state.loading}
                        >
                           {this.state.loading && (
                              <span className="spinner-border spinner-border-sm mr-2"> </span>
                           )}
                           <span>Login</span>
                        </button>

                        <button
                           className="btn btn-primary mx-auto"
                           disabled={ this.state.loading }
                           onClick={ this.register }
                        >
                           <span>Register</span>
                        </button>
                     </div>

                     {this.state.message && (
                        <div className="form-group">
                           <div className="alert alert-danger" role="alert">
                              {this.state.message}
                           </div>
                        </div>
                     )}
                     <CheckButton
                        className="buttonText"
                        style={{ display: "none" }}
                        ref={c => {
                           this.checkBtn = c
                        }}
                     />
                  </Form>
                        */ }
                  </Card.Body>
               </Card>
            </Row>
         </div>
      )
   }
}
