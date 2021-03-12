import React, { Component } from "react";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import us from "us";


export default class QuestionComponent extends Component {
  constructor(props) {
    super(props);

    this.changeAnswer = this.changeAnswer.bind(this);
    this.state = {
      answer: this.props.answer ? this.props.answer : ""
    }
  }

  render() {
    return (
      <Form.Group>
        <Form.Label>{ this.props.prompt ? this.props.prompt : "No prompt found" }</Form.Label>

        <Form.Control
          onChange={ this.props.onChange }
          value={ this.state.answer }
        ></Form.Control>

      </Form.Group>
    );
  }
}

