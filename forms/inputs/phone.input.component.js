import React from "react"
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import PhoneInput from './phone.component'

const PhoneInputComponent = (props) => {
  console.log(props.values.celltel)
  console.log(props.values.hometel)
  return (
    <Form.Row >

      <Form.Group as={ Col } >
        <Form.Label>Primary Phone</Form.Label>
        <PhoneInput
          name='celltel'
          onChange={ props.handleChange }
          autoComplete='tel'
          isValid={ props.touched.celltel && !props.errors.celltel }
          isInvalid={ !!props.errors.celltel }
          value={ props.values.celltel }
          type='tel'
        />
        <Form.Control.Feedback>
          { props.errors.celltel }
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={ Col } >
        <Form.Label>Secondary Phone</Form.Label>
        <PhoneInput
          name='hometel'
          onChange={ props.handleChange }
          disabled={ !props.values.celltel }
          autoComplete='tel'
          isValid={ props.touched.hometel && !props.errors.hometel }
          isInvalid={ !!props.errors.hometel }
          value={ props.values.hometel }
          type='tel'
        />
        <Form.Control.Feedback>
          { props.errors.hometel }
        </Form.Control.Feedback>
      </Form.Group>

    </Form.Row>
  );
}

export default PhoneInputComponent
