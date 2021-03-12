import React, { Component } from "react";
import { Form, Col } from "react-bootstrap";

export default class SchoolComponent extends Component {

  render() {
    return (
      <Form.Group className={ this.props.className }>

          <Form.Row className='mt-2' >
            <Form.Label>
              { this.props.school || "<school>" }
            </Form.Label>
            <Form.Text className='ml-auto' >
              { this.props.completed || '<completed>' }
            </Form.Text>
          </Form.Row>
          <Form.Row className='align-items-end' >

            <Form.Group as={ Col } >
              <Form.Row>
                <Form.Text muted>
                  { this.props.address1 }
                </Form.Text>
              </Form.Row>

              { this.props.address2 && (
                <Form.Row>
                  <Form.Text muted>
                    { this.props.address2 }
                  </Form.Text>
                </Form.Row>
              ) }

              <Form.Row>
                <Form.Text muted>
                  { this.props.city + ', ' + this.props.state + ' ' + this.props.zip }
                </Form.Text>
              </Form.Row>
            </Form.Group>

            <Form.Group as={ Col }>
              <Form.Row>
                <Form.Text muted>
                  Position: { this.props.major || '<major>' }
                </Form.Text>
              </Form.Row>

              <Form.Row>
                <Form.Text muted>
                  Salary: { this.props.degrees || '<degrees>' }
                </Form.Text>
              </Form.Row>

            </Form.Group>

          </Form.Row>

      </Form.Group>
    );
  }
}
