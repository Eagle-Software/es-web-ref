import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class UserPage extends Component {

  constructor(props) {
    super(props);
    console.log('UserPage')
    console.log(props);
    this.state = {
      currentUser: props.currentUser
    };
  }

  render() {
    const { currentUser } = this.state;
    console.log(currentUser);

    if (!currentUser) {
      return (
        <Redirect to="/login" />
      )
    } else return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> User Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    );
  }

}
