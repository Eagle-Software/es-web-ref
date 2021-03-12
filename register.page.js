import React, { Component } from "react"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import Select from "react-validation/build/select"
import CheckButton from "react-validation/build/button"
import { isEmail } from "validator"
import { Card } from 'react-bootstrap'

import AuthService, { USERTYPES } from "../services/auth.service"

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
  if (!isEmail(value)) { return (
    <div className="alert alert-danger" role="alert">
      This is not a valid email.
    </div>
  )
  }
}

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    )
  }
}

/*
 * Takes in a location state for
 * email
 * redirect page
 */

export default class RegisterPage extends Component {

  constructor(props) {
    super(props)

    this.handleRegister = this.handleRegister.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangePasswordConf = this.onChangePasswordConf.bind(this)
    this.onChangeUserType = this.onChangeUserType.bind(this)
    this.matchesPassword = this.matchesPassword.bind(this)
    this.onChangeUserType = this.onChangeUserType.bind(this)

    this.state = {
      email: this.props.email || (this.props.location && this.props.state && this.props.loaction.state.email) || "",
      password: "",
      passwordconf: "",
      successful: false,
      message: "",
      userType: this.props.userType || (this.props.location && this.props.location.state && this.props.location.state.userType) || USERTYPES.user
    }
  }

  onChangeUserType(e) {
    this.setState({
      userType: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  matchesPassword(value) {
    if (!(value === this.state.password)) {
      return (
        <div className="alert alert-danger" role="alert">
          Passwords must match!
        </div>
      )
    }
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangePasswordConf(e) {
    this.setState({
      passwordconf: e.target.value
    })
  }

  handleRegister(e) {
    e.preventDefault()

    this.setState({
      message: "",
      successful: false
    })

    this.form.validateAll()

    console.log("handleRegister")
    console.log(this.state)

    if (this.checkBtn.context._errors.length === 0) {
      // REGISTER
      AuthService.register(
        this.state.email,
        this.state.password,
        this.state.userType
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          })
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          this.setState({
            successful: false,
            message: resMessage
          })
        }
      )
    }
  }

  render() {
    return (

      <Card>
        <Card.Body>
          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c
            }}
          >
            {!this.state.successful && (
              <div className="d-flex flex-column justify-content-center" >
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
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="passwordconf">Confirm Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="passwordconf"
                    value={this.state.passwordconf}
                    onChange={this.onChangePasswordConf}
                    validations={[required, vpassword, this.matchesPassword]}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor=''>User Type</label>
                  <Select
                    className='form-control'
                    name='userType'
                    value={ this.state.userType }
                    onChange={ this.onChangeUserType }
                  >
                    { Object.entries(USERTYPES).map( ([key, value]) => {
                      return (<option value={ value } >{( (value) => {
                        switch (value) {
                          case USERTYPES.user:
                            return ('Standard User')
                          case USERTYPES.applicant:
                            return ('Applicant')
                          case USERTYPES.customer:
                            return ('Customer')
                          case USERTYPES.employee:
                            return ('Employee')
                          default:
                            return ('<error>')
                        } })(value) }</option>)
                    }) }

                  </Select>

                </div>

                { this.state.userType === USERTYPES.customer && (
                  <div className='form-group'>
                    <label htmlFor='customer'>Customer Code</label>
                    <Input
                      className='form-control'
                      name=''
                      value={ this.state.customer }
                      onChange={ this.onChangeCustomer }
                      validations={ [ required ] }
                    />
                  </div>
                ) }

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Register</button>
                </div>
              </div>
            )}

            { this.state.message && (
              <div className="form-group" >
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert" >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c
              }}
            />
          </Form>
        </Card.Body>
      </Card>
    )
  }
}
