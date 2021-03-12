import React, { Component } from "react"
import { Link } from "react-router-dom"

import { Navbar, NavDropdown, Nav, Image } from "react-bootstrap"

import AuthService from "../services/auth.service"

class Header extends Component {

  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)
    this.state = { height: 0 }
    this.updateHeight = this.updateHeight.bind(this)
  }

  logOut(e) {
    e.preventDefault()
    AuthService.logout()
    console.log(this.props)
    this.props.props.onUserChange()
    window.location.replace("/login")
  }

  componentDidMount() {
    this.updateHeight()
    window.addEventListener("resize", this.updateHeight)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight)
  }

  componentDidUpdate() {
    this.updateHeight()
  }

  updateHeight() {
    if (this.navbar != null) {
      if (this.state.height !== this.navbar.clientHeight) {
        this.props.props.onHeaderHeightChange(this.navbar.clientHeight)
        this.setState({ height: this.navbar.clientHeight })
      }
    }
  }

  render() {
    const { currentUser } = this.props.props

    return (
      <Navbar 
        ref={ ( navbar ) => { this.navbar = navbar } }
        collapseOnSelect
        expand='sm'
        sticky="top"
        className="
        gradientBack
        px-sm-5
        py-3
        pb-5
        flex-column
        flex-lg-row
        ">

        <Link to='/' className="px-3" >
          <Image fluid='md' src="/header.png" className="headerImg logo" />
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='my-1' />

        <Navbar.Collapse id="responsive-navbar-nav" >

          <Nav activeKey="/home" className="ml-auto">
            <Link to="/" className="navbar-text nav-link">
              Home
            </Link>
            <NavDropdown title="Services" >
              <Link to="/services/sterilization" className="dropdown-item">
                Medical Device Sterilization{/* (H<sub>2</sub>O<sub>2</sub> Gas Plasma, EtO, Gamma Irradiation, E-Beam) */}
              </Link>
              <Link to="/services/production" className="dropdown-item">
                Production and Packaging
              </Link>
              <Link to="/services/development" className="dropdown-item">
                Product Development and FDA Approval
              </Link>
            </NavDropdown>
            <Link to="/about" className="navbar-text nav-link">
              About Us
            </Link>
            <Link to="/contact" className="navbar-text nav-link">
              Contact Us
            </Link>
            <Link to="/careers" className="navbar-text nav-link">
              Careers
            </Link>
            { !currentUser ? (
              <Link to="/login" className="navbar-text nav-link">
                Customer Portal
              </Link>
            ) : (
              <Link to="/login" className="navbar-text nav-link" onClick={ this.logOut } >
                Logout
              </Link>
            )}
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header
