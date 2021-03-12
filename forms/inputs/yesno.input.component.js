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

const YesNoInputComponent = (props) => {
  return (
    <Form.Group
      name={ props.name }
      value={ props.value }
      onChange={ props.handleChange }
      className={ props.className }
      as={ Col } >
      <Form.Check
        inline
        type='radio'
        label={ STRINGS[VALUES.YES] }
        name={ props.name }
        value={ VALUES.YES }
        checked={ props.value === VALUES.YES }
        id={ props.name + '.yesRadio'}
      />
      <Form.Check
        inline
        type='radio'
        label={ STRINGS[VALUES.NO] }
        name={ props.name }
        value={ VALUES.NO }
        checked={ props.value === VALUES.NO }
        id={ props.name + '.noRadio'}
      />
    </Form.Group>
  )
}

export default YesNoInputComponent
