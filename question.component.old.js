import React, { Component } from "react";
import { Button, Card, Row, Col, Form } from "react-bootstrap";

import { Formik, Field, Form as FForm } from 'formik';
import * as Yup from 'yup';

const ANSWER_CHARLIM_DEFAULT = 400;

class QuestionComponent extends Component {
  constructor(props) {
    super(props);

    this.answerValidationSchema = Yup.object().shape({
      answer: Yup.string()
      .max(this.props.charLim, "The character limit is $(min)")
    });

    this.defaultFormState = {
      answer: this.props.defaultValue || ""
    };

  }

  validateAnswer(answer) {
    let error;
    this.answerValidationSchema.isValid({
      answer: answer
    }).then( (valid) => {
      if (!valid) {
        error = "invalid";
      }
    }).catch( (err) => {

    });
    return error;
  }

  render() {
    return (
      <Formik
        initialValues={this.defaultFormState} >

        {( ({ handleSubmit, handleChange, values, errors, touched }) => (

          <Form.Group className="ml-3" >

            <Form.Label>
              { this.props.prompt || "<prompt>" }
            </Form.Label>


            { !this.props.numLines || this.props.numLines === 0 ? (
              <Field
                as={Form.Control}
                validate={this.validateAnswer}
                name="answer" />
            ) : (
              <Field
                as={Form.Control}
                validate={this.validateAnswer}
                name="answer" 
                onChange={ handleChange }
                as="textarea"
                maxlength={ this.props.charLim ||  ANSWER_CHARLIM_DEFAULT }
                placeholder={ this.props.placeholder || "" }
                rows={ this.props.numLines } />
            )}

          </Form.Group>

        ))}
      </Formik>
    );
  }
}

export default QuestionComponent;
