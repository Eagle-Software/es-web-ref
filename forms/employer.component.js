import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";


export default class EmployerComponent extends Component {

  render() {
    return (
      <Form.Group className={ this.props.className } >

          <Form.Row className='mt-2' >
            <Form.Label>
              { this.props.employer || "<employer>" }
            </Form.Label>
            <Form.Text className='ml-auto' >
              { this.props.start || '<start>' } to { this.props.end || '<end>' }
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
                <Form.Text muted >
                  { this.props.city + ', ' + this.props.state + ' ' + this.props.zip }
                </Form.Text>
              </Form.Row>
            </Form.Group>

            <Form.Group as={ Col }>
              <Form.Row>
                <Form.Text muted>
                  Position: { this.props.position || '<position>' }
                </Form.Text>
              </Form.Row>

              <Form.Row>
                <Form.Text muted>
                  Salary: { this.props.salary || '<salary>' }
                </Form.Text>
              </Form.Row>

              <Form.Row>
                <Form.Text muted>
                  Supervisor: { this.props.supervisor || '<supervisor>'}
                </Form.Text>
              </Form.Row>
            </Form.Group>
          </Form.Row>

          <Form.Row>

            <Col >
              <Form.Row>
                <Form.Text muted>
                  { this.props.description || '<description>' }
                </Form.Text>
              </Form.Row>
            </Col>

            <Col >
              <Form.Row>
                <Form.Text muted>
                  Reason for leaving: { this.props.reason || '<reason>' }
                </Form.Text>
              </Form.Row>
            </Col>

          </Form.Row>

      </Form.Group>
    );
  }
}
