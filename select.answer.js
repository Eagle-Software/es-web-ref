import React, { Component } from 'react';

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

      /* adjust min and max if necessary (input sanitation) */
      if (props.min) {
         (props.min < 0) && (props.min = 0);
         if (props.max) {
            (props.max > ANSWER_TEXT_MAXLEN_MAX) && (props.max = ANSWER_TEXT_MAXLEN_MAX);
            (props.max < 0) && (props.max = 0);
            (props.min > props.max) && (props.min = props.max);
         } else (props.max = ANSWER_TEXT_MAXLEN_DEFAULT);
      } else (props.min = ANSWER_TEXT_MINLEN_DEFAULT);

      this.validationSchema = {
         answer: Yup.string()
         .min(props.min, 'Too short!')
         .max(props.max, 'Too long!')
      };

      /* Add required property if necessary */
      props.required && (
         this.validationSchema.answer = this.validationSchema.answer.required('Required'));
   }

   validateAnswer(answer) {
      let error;
      this.validationSchema.isValid({
         answer: answer
      }).then ( (valid) => {
         if (!valid) {
            error = "Invalid answer";
         }
      }).catch ( (err) => {
         error = err;
      });
      /* error is only set if there was an error */
      return error;
   }

   render() {
      return (
         <Field
            name={ this.props.name }
            className="form-control"
            validate={ this.validateAnswer }
            as={ (this.props.quesion.numLines && this.props.question.numLines > 0 ) ?
                  "textarea" : "text" }
            maxlength={ this.props.max }
            placeholder={ this.props.question.placeholder || "" }
            rows={ this.props.question.numLines || ANSWER_TEXT_NUMLINES_DEFAULT }
         />
      );
   }

}
