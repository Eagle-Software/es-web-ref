import React from "react"
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

export default (props) => {
  return (
    <Form.Control
      name={ props.name }
      onChange={ props.onChange }
      autoComplete={ props.autoComplete || 'tel' }
      disabled={ props.disabled }
      isValid={ props.touched && !props.error }
      isInvalid={ !!props.error }
      value={ props.value }
      type='tel'
      placeholder={ props.placeholder || '(805) 123-4567' }
    />
  );
}
