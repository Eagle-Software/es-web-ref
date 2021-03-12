import React, { Component } from "react";
import { Form } from "react-bootstrap";


export default class ReferenceComponent extends Component {

  render() {
    console.log(this.props);
    return (
      <Form.Group>
        <Form.Row className={ 'align-items-baseline ' + this.props.className } >
          <Form.Label className='col mb-0' >
            { this.props.name || "<name>" }
          </Form.Label>
          <Form.Text muted className='col' >
            { this.props.tel || '<tel>' }
          </Form.Text>
          <Form.Text muted className='col' >
            { this.props.relation || '<relation>' }
          </Form.Text>
        </Form.Row>
      </Form.Group>
    );
  }
}
