import React, { Component } from "react";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import us from "us";

import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import QuestionComponent from './question.component';

const QUESTION_PROMPT_MAXLEN = 280;
const ANSWER_CHARLIM_MAX = 400;
const ANSWER_CHARLIM_DEFAULT = ANSWER_CHARLIM_MAX;
const ANSWER_NUMLINES_MAX = 50;
const ANSWER_NUMLINES_DEFAULT = 0;

// Yup setup
const validationSchema = Yup.object().shape({

  prompt: Yup.string()
  .min(1, "You need a prompt")
  .max(QUESTION_PROMPT_MAXLEN, "Prompt can't be longer than ${max}")
  .required("A prompt is required"),

  charLim: Yup.number()
  .min(1, "Can't be less than ${min}")
  .max(ANSWER_CHARLIM_MAX, "Can't be more than ${max}" )
  .integer("No decimals please"),

  numLines: Yup.number()
  .min(0, "Can't be negative")
  .max(ANSWER_NUMLINES_MAX, "Can't be more than ${max}" )
  .integer("No decimals please")

});

class QuestionCreateComponent extends Component {
  constructor(props) {
    super(props);

    this.defaultFormState = {
      prompt: this.props.prompt || "",
      charLim: this.props.charLim ||  ANSWER_CHARLIM_DEFAULT,
      numLines: this.props.numLines || ANSWER_NUMLINES_DEFAULT
    }

    this.state = {
      message: "",
      loading: false
    }

  }

  handleSubmit = (form) => {
    this.setState({
      message: "Submitting",
      loading: true
    });
  }

  validatePrompt(value) {
    let error;

  }

  render() {
    return (
      <Formik
        onSubmit={ this.handleSubmit}
        initialValues={ this.defaultFormState }
        >

        {( ({ isValidating, handleSubmit, handleChange, values, errors, touched }) => (
          <Form.Group className="ml-3" >

            <Form.Group>
              <Form.Label>
                Prompt
              </Form.Label>
              <Form.Control as="textarea" onChange={ handleChange } />
              { errors.prompt && touched.prompt && (
                <div>{errors.prompt}</div>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Character Limit
              </Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Number of lines to show
              </Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Preview
              </Form.Label>
              <QuestionComponent
                prompt={ values.prompt }
                charLim={ values.charLim }
                numLines={ values.numLines } >
              </QuestionComponent>
            </Form.Group>
          </Form.Group>
        ))}

      </Formik>
    );
  }
}

export default QuestionCreateComponent;
