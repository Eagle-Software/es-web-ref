import React, { Component } from "react"
import { Form } from "react-bootstrap"

import { AsYouType } from 'libphonenumber-js'

import 'yup-phone'

export default class PhoneComponent extends Component {


  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.state = {
      value: this.props.value ? (new AsYouType('US')).input(this.props.value) : ''
    }
  }

  onComponentDidMount() {
    /* update parent with formatted phone number */
    // this.props.onChange( createPatchFrom( this.state.value ) );
  }

  onChange(e) {
    const out = (new AsYouType('US')).input(e.target.value)
    this.setState({
      value: out
    })
    e.target.value = out;
    this.props.onChange && this.props.onChange( e );
  }

  render() {
    return (
      <Form.Control
        name={ this.props.name }
        key={ this.props.key }
        onChange={ this.onChange }
        autoComplete='tel'
        isValid={ this.props.isValid }
        isInvalid={ this.props.isInvalid }
        value={ this.state.value }
        type='tel'
        placeholder='Phone number'
      />
    )
  }
}
