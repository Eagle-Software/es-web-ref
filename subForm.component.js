import React from 'react'
/* import PropTypes from 'prop-types' */
import { Form as RFForm } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import { Button, Form } from 'react-bootstrap'

/* Copied from https://codesandbox.io/s/km2n35kq3v?file=/index.js:948-954 */
export default class SubForm extends React.Component {
  /*
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }
  */
  static Page = ({ children }) => children

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      values: props.initialValues || {}
    }
  }

  next = ( values ) =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }))

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }))

  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  validate = ( values ) => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  handleSubmit = values => {
    const { children, onSubmit } = this.props
    const { page } = this.state
    const isLastPage = page === React.Children.count(children) - 1
    if (isLastPage) {
      return onSubmit(values)
    } else {
      this.next(values)
    }
  }

  render() {
    const { children } = this.props
    const { page, values } = this.state
    const activePage = React.Children.toArray(children)[page]
    const isLastPage = page === React.Children.count(children) - 1
    return (
      <RFForm
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        mutators={{ ...arrayMutators }}
        render={
          ({
            handleSubmit,
              submitting,
              form: {
                mutators: { push, pop }
              },
              values
          }) => {
            return (
              <Form onSubmit={handleSubmit}>

                { activePage }

                <Form.Row>
                  <Form.Group>
                    {page > 0 && (
                      <Button type="button" onClick={this.previous}>
                        « Previous
                      </Button>
                    )}
                    {!isLastPage &&
                      <Button className="float-right" type="submit">Next »</Button>
                    }
                    {isLastPage && (
                      <Button className="float-right" type="submit" disabled={submitting}>
                        Submit
                      </Button>
                    )}
                  </Form.Group>

                  {/*
            <Form.Group>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </Form.Group>
            */}

                </Form.Row>
              </Form>

            )}}
      />
    )
  }
}

