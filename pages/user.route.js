import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Switch, Route } from 'react-router-dom'

/* Pages */
import ModPage from './mod.page'
import AdminPage from './admin.page'

import UserPage from './user.page' /* Default Page */
import NotFoundPage from 'pages/notFound.page' /* 404 */

export default class UserRoute extends Component {

   render() {
      return (
         <Container>
            { (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') && <>User Route</> }
            <Switch>

               <Route exact path='/user/mod' 
                  render={ (props) => <ModPage { ...this.props } /> } />

               <Route exact path='/user/admin' 
                  render={ (props) => <AdminPage { ...this.props } /> } />

               <Route exact path='/user'
                  render={ (props) => <UserPage { ...this.props } /> } />

               <Route component={ NotFoundPage } />

            </Switch>
         </Container>
      )
   }

}
