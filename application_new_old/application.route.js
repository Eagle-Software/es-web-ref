import React, { Component } from "react"
import { Button, Card, Container } from "react-bootstrap"
import { Switch, Route } from "react-router-dom"
import Form from 'react-bootstrap/Form'

import Steps from 'rc-steps'

import ApplicationPage from "./application.page"
import PrelimPage from "./prelim.page"
import EmplHistoryPage from "./emplhistory.page"
import EdHistoryPage from "./edhistory.page"
import ReferencesPage from "./references.page"
import ReviewPage from "./review.page"
import NotFoundPage from 'pages/notfound.page'

const sequence = [
   ApplicationPage,
   PrelimPage,
   EmplHistoryPage,
   EdHistoryPage,
   ReferencesPage,
   ReviewPage
]

const sequencePath = [
   `/forms/application/`,
   `/forms/application/prelim`,
   `/forms/application/emplhistory`,
   `/forms/application/edhistory`,
   `/forms/application/references`,
   `/forms/application/review`,
]

const sequencePathStrs = [
   `Application start`,
   `Preliminary Questions`,
   `Employment History`,
   `Education History`,
   `References`,
   `Application Review`,
]

export default class ApplicationRoute extends Component {

   constructor(props) {
      super(props)
      const index = sequencePath.indexOf(window.location.pathname)
      if (index < 0) {
         this.state = {
            index: 0
         }
      } else {
         this.state = {
            index: sequencePath.indexOf(window.location.pathname)
         }
      }

      this.pass = React.createRef()

      this.back = this.back.bind(this)
      this.forward = this.forward.bind(this)
   }

   back = () => {
      this.pass.current && this.pass.current.click();
      console.log("back")
      console.log(this.state.index)
      if (this.state.index > 0) {
         window.location.replace( sequencePath[this.state.index - 1] )
      }
   }

   forward = () => {
      this.pass.current && this.pass.current.click();
      console.log("forward")
      console.log(sequencePath[this.state.index + 1]) 
      if (this.state.index < sequencePath.length) {
         window.location.replace( sequencePath[this.state.index + 1] )
      }
   }

   render() {
      return (
         <Container>
            { (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') && <>Application Route</> }
            <Card>
               <Form.Group >
                  <Form.Label>
                     <h3>Application for Employment</h3>
                  </Form.Label>
                  <Form.Text muted className='mx-2' >
                     Eagle Medical, Inc. is an equal opportunity employer and does not unlawfully discriminate in employment. No question of this application is used for the purpose of limiting or excluding any applicant from consideration for employment on a basis prohibited by local, state, or federal law. Equal access to employment, service, and programs is available to all persons. Those applicants requiring reasonable accomodation to the application and/or interview process shoud notify a representative of the organization.
                  </Form.Text>
               </Form.Group>

               <Form.Group  className='d-flex flex-wrap justify-content-between align-items-center container' >
                  { this.state.index > 0 && (
                     <Button className='float-left' type='submit' onClick={ this.back } >
                        Go back
                     </Button>
                  )}
                  <Form.Label className='float-middle'>
                     <h4>{sequencePathStrs[this.state.index]}</h4> 
                  </Form.Label>
                  { this.state.index < sequencePathStrs.length - 1 && (
                     <Button className='float-right' type='submit' onClick={ this.forward } >
                        Continue
                     </Button>
                  ) || (
                     <div />
                  )}
               </Form.Group>

               <Switch>
                  <Route exact path="/application" component={ApplicationPage} />
                  <Route exact path="/application/prelim" component={ () => { return (
                     <PrelimPage pass={ this.pass } />)} } />
                  <Route exact path="/application/emplhistory" component={EmplHistoryPage} />
                  <Route exact path="/application/edhistory" component={EdHistoryPage} />
                  <Route exact path="/application/references" component={ReferencesPage} />
                  <Route exact path="/application/review" component={ReviewPage} />
                  <Route component={NotFoundPage} />
               </Switch>

               <Form.Group  className='d-flex flex-wrap justify-content-between align-items-center container' >
                  { this.state.index > 0 && (
                     <Button className='float-left' type='submit' onClick={ this.back } >
                        Go back
                     </Button>
                  )}
                  { this.state.index < sequencePathStrs.length - 1 && (
                     <Button className='float-right' type='submit' onClick={ this.forward } >
                        Continue
                     </Button>
                  ) || (
                     <div />
                  )}
               </Form.Group>

            </Card>
         </Container>
      )
   }
}

