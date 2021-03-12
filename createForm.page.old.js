import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import UserService from "../../services/user.service";
import FormService from "../../services/form.service";

import { Formik } from 'formik';
import * as Yup from 'yup';

import QuestionCreateComponent from './question.create.component';

/*  */
const AnswerTypes = {
   TEXT: 'text',
   CHECKBOX: 'checkbox',
   RADIOBUT: 'radiobutton',
   SELECT: 'select'
}

const AnswerTypeStrings = {};
AnswerTypeStrings[AnswerTypes.TEXT] = 'Text';
AnswerTypeStrings[AnswerTypes.CHECKBOX] = 'Check-box';
AnswerTypeStrings[AnswerTypes.RADIOBUT] = 'Radio-button';
AnswerTypeStrings[AnswerTypes.SELECT] = 'Drop-down box';

export default class FormsPage extends Component {
   constructor(props) {
      super(props);

      this.state = {
         answerType: AnswerTypes.TEXT,
         formKey: "",
         questions: [],
         content: "",
         ta: "",
         textCharLim: 280
      };

      this.addQuestion = this.addQuestion.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.changeTitle = this.changeTitle.bind(this);
      this.changeDescription = this.changeDescription.bind(this);
      this.changeFormKey = this.changeFormKey.bind(this);
      this.changeAnswerType= this.changeAnswerType.bind(this);
      this.submit = this.submit.bind(this);
   }

   addQuestion(e) {
      e.preventDefault();
      console.log("addQuestion");
      if(this.state.ta != "") {
         this.setState({
            questions: [...this.state.questions,  this.state.ta]
         });
         console.log(this.state);
      }
   }

   changeAnswerType(e) {
      this.setState({
         answerType: e.target.value
      });
   }

   changeFormKey(e) {
      this.setState({
         formKey: e.target.value
      });
   }

   changeDescription(e) {
      this.setState({
         description: e.target.value
      });
   }

   changeTitle(e) {
      this.setState({
         title: e.target.value
      });
   }

   handleChange(e) {
      this.setState({
         ta: e.target.value
      });
   }

   submit(e) {
      e.preventDefault();
      console.log("submit");
      FormService.submit({
         title: this.state.title,
         description: this.state.description,
         formKey: this.state.formKey, 
         questions: this.state.questions
      });
   }

   componentDidMount() {
      UserService.getPublicContent().then(
         response => {
            this.setState({
               content: response.data
            });
         },
         error => {
            this.setState({
               content:
               (error.response && error.response.data) ||
               error.message ||
               error.toString()
            });
         }
      );
   }

   save() {
      console.log("save")
   }

   render() {
      console.log(this.state);
      return (
         <>
            <Card>
               <Form.Group>
                  <Form.Label>
                     { this.state.title ? this.state.title : "<title>" }
                  </Form.Label>
                  { this.state.description && (
                     <Form.Text muted className="ml-3" >
                        { this.state.description }
                     </Form.Text>)
                  }
               </Form.Group>

               <Form.Group className="ml-3" >
                  {this.state.questions.length != 0 ? this.state.questions.map((question, i) => {
                     return (
                        <Form.Group key={i} controlId={i}>
                           <Form.Label>
                              {question}
                           </Form.Label>
                        </Form.Group>
                     )}) : (
                        <Form.Label>
                           No questions
                        </Form.Label>
                     )}
               </Form.Group>
            </Card>

            <Card>

               <Form onSubmit={this.addQuestion}>
                  <Form.Group>
                     <Form.Label>
                        Form identifier (
                     </Form.Label>
                     <Form.Control onChange={this.changeFormKey} />
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>
                        Title
                     </Form.Label>
                     <Form.Control onChange={this.changeTitle} />
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>
                        Description (optional)
                     </Form.Label>
                     <Form.Control onChange={this.changeDescription} />
                  </Form.Group>
                  <Form.Group controlId="ta">
                     <Form.Group>
                        <Form.Label>
                           Add a question:
                        </Form.Label>
                     </Form.Group>
                     <QuestionCreateComponent />
                     <Form.Group>
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                           value={this.state.answerType}
                           as='select'
                           onChange={this.changeAnswerType} >
                           <option value={ AnswerTypes.TEXT } >{ AnswerTypeStrings[AnswerTypes.TEXT] }</option>
                           <option value={ AnswerTypes.CHECKBOX} >{ AnswerTypeStrings[AnswerTypes.CHECKBOX] }</option>
                           <option value={ AnswerTypes.RADIOBUT} >{ AnswerTypeStrings[AnswerTypes.RADIOBUT] }</option>
                           <option value={ AnswerTypes.SELECT} >{ AnswerTypeStrings[AnswerTypes.SELECT] }</option>
                        </Form.Control>
                        <Form.Group>
                           <Form.Label>
                              { AnswerTypeStrings[this.state.answerType] } options:
                           </Form.Label>
                           {(() => {
                              switch (this.state.answerType) {
                                 case AnswerTypes.TEXT:
                                    return (
                                       <Form.Group>
                                          <Form.Text>
                                             one line or a paragraph, character limit, number of lines
                                          </Form.Text>
                                          <Form.Group controlId="text-charlim" >
                                             <Form.Label>
                                                Character limit (0 for no limit)
                                             </Form.Label>
                                             <Form.Control type="number" />
                                          </Form.Group>
                                       </Form.Group>
                                    );
                                 case AnswerTypes.CHECKBOX:
                                    return (
                                       <Form.Group>
                                          <Form.Text>
                                             items and their labels - need at least 1 item
                                          </Form.Text>
                                       </Form.Group>
                                    );
                                 case AnswerTypes.RADIOBUT:
                                    return (
                                       <Form.Group>
                                          <Form.Text>
                                             items and their labels - need to have items.length > 1
                                          </Form.Text>
                                          { (() => {
                                             return (<></>);
                                          })}

                                       </Form.Group>
                                    );
                                 case AnswerTypes.SELECT:
                                    return (
                                       <Form.Group>
                                          <Form.Text>
                                             items (at least 2), default item
                                          </Form.Text>
                                       </Form.Group>
                                    );
                                 default:
                                    return (
                                       <Form.Group>
                                          <Form.Label>Error</Form.Label>
                                       </Form.Group>
                                    );
                              }
                           })()}
                        </Form.Group>
                     </Form.Group>
                  </Form.Group>
                  <Button type="submit" onClick={this.addQuestion} >
                     save question
                  </Button>
               </Form>

               <Button type="submit" onClick={this.submit}>
                  <span>Submit and save form</span>
               </Button>
            </Card>
         </>
                        );
   }
}
