import React from "react"
import Form from "react-bootstrap/Form"

const VALUES = {
  YES: 'yes',
  NO: 'no',
}

const STRINGS = {}
STRINGS[VALUES.YES] = 'Yes'
STRINGS[VALUES.NO] = 'No'

const ChecksInput = (props) => {
  return (
    <div
      className={ props.className }
    >
      <Form.Check
        checked={ props.value && props.value.includes('fullv') }
        onChange={ props.handleChange }
        inline
        label={ 'Full-Time' }
        type='checkbox'
        value='fullv'
        name={ props.name }
        id={ props.name + '.full' } />
      <Form.Check
        checked={ props.value && props.value.includes('partv') }
        onChange={ props.handleChange }
        inline
        label={ 'Part-Time' }
        type='checkbox'
        value='partv'
        name={ props.name }
        id={ props.name + '.part' } />
      <Form.Check
        checked={ props.value && props.value.includes('tempv') }
        onChange={ props.handleChange }
        inline
        label={ 'Temporary' }
        type='checkbox'
        value='tempv'
        name={ props.name }
        id={ props.name + '.temp' } />
    </div>
  )
}

export default ChecksInput
