import React, { Component } from "react"
import { Container } from "react-bootstrap"

import Markdown from 'react-markdown'

const heading = `
# **Development and FDA Approval**
<hr />
`

const description = `
Eagle Medical provides a wealth of knowledge and experience in helping our customers navigate the stringent FDA requirements and verification processes required when bringing their medical devices to market.
`
const points = `
* Sterilization Validation
* Packaging validation
* Cleaning Validation
* Process Validation
* Purchasing/Vendor Audits
* Incoming Inspection (to verify specifications of packaging materials)
* Documentation
* Device Master Records
* Procedures
* Batch Records
* Inspection Records
* Protocol Development
* Testing Coordination
* Data Analysis
* Final Reports
* Engineering
`

export default class Template extends Component {

   constructor(props) {
      super(props)

      this.state = {
         content: ""
      }

   }


   render() {
      return (
         <Container className="">
            <Markdown children={heading} allowDangerousHtml />
            <div className="text-muted">
            <Markdown children={description} />
            <Markdown children={points} />
            </div>
         </Container>
      )
   }
}
