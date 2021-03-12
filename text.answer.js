import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

import { Formik, Field } from 'formik';
import * as Yup from 'yup';

const ANSWER_TEXT_MINLEN_DEFAULT = 0;
const ANSWER_TEXT_MAXLEN_DEFAULT = 400;
const ANSWER_TEXT_MAXLEN_MAX = 10000;
const ANSWER_TEXT_NUMLINES_DEFAULT = 3;

/* TextAnswer
 *   required: if this input is required
 *   minLen: 
 *   maxLen: 
 *   numLines: Number of lines to show.
 *     '0': Special case that uses a text input type instead of textarea
 */
export default class TextAnswer extends Component {

   constructor(props) {
      super(props);
      this.getTextAnswerValidationSchema = this.getTextAnswerValidationSchema.bind(this);
   }

   getTextAnswerValidationSchema(question) {
      var min = this.props.min;
      var max = this.props.max;

      /* adjust min and max if necessary (input sanitation) */
      if (min) {
         (min < 0) && (min = 0);
      } else {
         (min = ANSWER_TEXT_MINLEN_DEFAULT);
      }
      if (max) {
         /* if max is larger than the maximum maxlen */
         (max > ANSWER_TEXT_MAXLEN_MAX) && (max = ANSWER_TEXT_MAXLEN_MAX);
         /* if max is less than zero */
         (max < 0) && (max = 0);
         /* if max is less than min */
         (min > max) && (min = max);
      } else { (max = ANSWER_TEXT_MAXLEN_DEFAULT) };

      this.validationSchema = {
         answer: Yup.string()
         .min(min, 'Too short!')
         .max(max, 'Too long!')
      };
   }

      /* Add required property if necessary */
      /*
      props.required && (
         this.validationSchema.answer = this.validationSchema.answer.required('Required'));
         */

   render() {
      return (
         <Form.Control
            name={ this.props.name }
            className="form-control"
            type={ (this.props.question.numLines && this.props.question.numLines > 0 ) ?
                  "textarea" : "text" }
            maxLength={ this.props.max }
            placeholder={ this.props.question.placeholder || "" }
            rows={ this.props.question.numLines || ANSWER_TEXT_NUMLINES_DEFAULT }
         />
      );
   }

}
