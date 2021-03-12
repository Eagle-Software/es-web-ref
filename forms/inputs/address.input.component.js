import React from "react"
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import us from 'us'


const AddressInputComponent = (props) => {
  return (
    <Form.Group >

      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control
          name='address1'
          onChange={ props.handleChange }
          autoComplete='address-line1'
          isValid={ props.touched.address1 && !props.errors.address1 }
          isInvalid={ !!props.errors.address1 }
          value={ props.values.address1 }
          type='text'
          placeholder='1234 Main St.'
        />
        <Form.Control.Feedback>
          { props.errors.address1 }
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Control
          name='address2'
          onChange={ props.handleChange }
          disabled={ !props.values.address1 }
          autoComplete='address-line2'
          isValid={ props.touched.address2 && !props.errors.address2 }
          isInvalid={ !!props.errors.address2 }
          value={ props.values.address2 }
          type='text'
          placeholder='Apartment, studio, floor, etc.'
        />
        <Form.Control.Feedback>
          { props.errors.address2 }
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Row className='align-items-end' >
        <Form.Group as={ Col } xs={ 7 } >
          <Form.Label>City</Form.Label>
          <Form.Control
            name='city'
            onChange={ props.handleChange }
            autoComplete='address-level2'
            isValid={ props.touched.city && !props.errors.city }
            isInvalid={ !!props.errors.city }
            value={ props.values.city }
            type='text'
            placeholder='Paso Robles'
          />
          <Form.Control.Feedback>
            { props.errors.city }
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={ Col } xs={ 'auto' } >
          <Form.Label>State</Form.Label>
          <Form.Control
            name='state'
            onChange={ props.handleChange }
            autoComplete='address-level1'
            isValid={ props.touched.state && !props.errors.state }
            isInvalid={ !!props.errors.state }
            value={ props.values.state }
            as='select'>

            { us.STATES.map( (value, i ) => {
              return (
                <option
                  key={ value.abbr }
                  value={ value.abbr }>
                  {value.abbr}
                </option>
              )}) }

          </Form.Control>
          <Form.Control.Feedback>
            { props.errors.state }
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={ Col } >
          <Form.Label className='text-nowrap' >Zip Code</Form.Label>
          <Form.Control
            name='zip'
            onChange={ props.handleChange }
            autoComplete='postal-code'
            isValid={ props.touched.zip && !props.errors.zip }
            isInvalid={ !!props.errors.zip }
            value={ props.values.zip }
            type='text'
          />
          <Form.Control.Feedback>
            { props.errors.zip }
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
    </Form.Group>
  );
}

export default AddressInputComponent
