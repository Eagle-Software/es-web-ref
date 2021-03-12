import React, { Component } from "react"
import { Link } from "react-router-dom"

import { Row, Col, Navbar, NavDropdown, Nav, Image } from "react-bootstrap"

class Header extends Component {

  constructor(props) {
    super(props)
    this.state = { height: 0 }
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

  updateHeight = () => {
    if (this.navbar != null && this.props && this.props.props) {
      if (this.state.height !== this.navbar.clientHeight) {
        this.props.props.onHeaderHeightChange(this.navbar.clientHeight)
        this.setState({ height: this.navbar.clientHeight })
      }
    }
  }

  render() {
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

              <Link
                to="/"
                className="navbar-text nav-link" >
                Home
              </Link>

              <Link
                to="/services/sterilization"
                className="navbar-text nav-link">
                Sterilization
              </Link>

              <Link
                to="/services/production"
                className="navbar-text nav-link">
                Packaging
              </Link>

              <Link
                to="/services/development"
                className="navbar-text nav-link">
                Product Development
              </Link>

              <Link
                to="/about"
                className="navbar-text nav-link">
                About Us
              </Link>

              <Link
                to="/contact"
                className="navbar-text nav-link">
                Contact Us
              </Link>

              <Link
                to="/careers"
                className="navbar-text nav-link">
                Careers
              </Link>

            </Nav>

        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header
