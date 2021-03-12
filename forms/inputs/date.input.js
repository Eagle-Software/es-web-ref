import React from "react"
import Form from "react-bootstrap/Form"
import Col from 'react-bootstrap/Col'

const VALUES = {
  YES: 'yes',
  NO: 'no',
}

const STRINGS = {}
STRINGS[VALUES.YES] = 'Yes'
STRINGS[VALUES.NO] = 'No'

export default (props) => {
  return (
    <Form.Control
      align='right'
      className={ props.className }
      name={ props.name }
      value={ props.value }
      onChange={ props.handleChange }
      type='date'
    />
  )
}

