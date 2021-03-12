/* react */
import React, { Component } from 'react'

/* react-bootstrap */
import { Row, Container } from 'react-bootstrap'

export default class FormPage extends Component {

   /* Don't forget to show notFound.page if there is no form with the params.id */

   render() {
      return (
         <Container>

            <Row>
               { this.props.match.params.id }
            </Row>
            <Row>
               { this.props.match.params.id }
            </Row>

         </Container>
      )
   }

}
