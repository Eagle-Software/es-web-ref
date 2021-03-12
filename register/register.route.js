import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";

import RegisterPage from "../register/register.page";
import ApplicantPage from "../register/applicant.page";
import EmployeePage from "../register/employee.page";
import CustomerPage from "../register/customer.page";
import UserPage from "../register/user.page";

export default class RegisterRoute extends Component {
   render() {
      return (
         <Container>
            RegisterRoute
            <Switch>
               <Route exact path="/register" component={RegisterPage} />
               <Route exact path="/register/applicant" component={ApplicantPage} />
               <Route exact path="/register/employee" component={EmployeePage} />
               <Route exact path="/register/customer" component={CustomerPage} />
               <Route exact path="/register/user" component={UserPage} />
            </Switch>
         </Container>
      );
   }
}
