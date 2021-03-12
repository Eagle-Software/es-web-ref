import React, { Component } from "react"
import { Card, Form } from "react-bootstrap"

import PrelimPage from './prelim.page'

import EmployerComponent from './employer.component'
import SchoolComponent from './school.component'
import ReferenceComponent from './reference.component'
import ChecksInputComponent from './checks.input'

export default class ApplicationComponent extends Component {

  render() {
    console.log(this.props)
    return (
      <Card>
        <Form.Label>
          <h4><strong>{ this.props.fname || '<fname>' } { this.props.lname || '<lname>' }</strong></h4>
        </Form.Label>
        <Form.Row className='align-items-center' >
          <Form.Group className='col' >
            <Form.Text muted>
              { this.props.address1 || '<address1>' }
            </Form.Text>
            { this.props.address2  && (
              <Form.Text muted >
                { this.props.address2 || '<address2>' }
              </Form.Text>
            )}
            <Form.Text muted>
              { this.props.city || '<city>' }, { this.props.state || '<state>' } { this.props.zip || '<zip>' }
            </Form.Text>
          </Form.Group>
          <Form.Group className='col' >
            <Form.Text muted>
              { this.props.owner || '<email>' }
            </Form.Text>
            <Form.Text muted>
              { this.props.celltel || '<celltel>' }
            </Form.Text>
            { this.props.hometel && (
              <Form.Text muted>
                { this.props.hometel }
              </Form.Text>
            )}
          </Form.Group>
        </Form.Row>

        { this.props.employers.length > 0 && (
          <Form.Group>
            <Form.Label>
              <h5>Employment History</h5>
            </Form.Label>
            { this.props.employers.map( (employer, i) => (
              <EmployerComponent { ...employer } />
            ))}
          </Form.Group>
        )}

        { this.props.schools.length > 0 && (
          <Form.Group>
            <Form.Text>
              <h5>Education History</h5>
            </Form.Text>
            { this.props.schools.map( (school, i) => (
              <SchoolComponent { ...school } />
            ))}
          </Form.Group>
        )}

        { this.props.references.length > 0 && (
          <Form.Group>
            <Form.Text>
              <h5>References</h5>
            </Form.Text>
            { this.props.references.map( (reference, i) => (
              <ReferenceComponent { ...reference } />
            ))}
          </Form.Group>
        )}

        <Form.Group>
          <Form.Text>
            <h5>Questions</h5>
          </Form.Text>

          <Form.Group>
            <Form.Row>
              <Form.Text className='col-auto mr-auto' >
                { PrelimPage.prompts().positions }
              </Form.Text>
              <Form.Text muted className='col-auto ml-3'>
                { this.props.positions }
              </Form.Text>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Text className='col-auto mr-auto' >
                { PrelimPage.prompts().empltype }
              </Form.Text>
              <Form.Text muted className='col-auto ml-3'>
                <ChecksInputComponent 
                  value={ this.props.empltype }
                />
              </Form.Text>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Text className='col-auto mr-auto' >
                { PrelimPage.prompts().startdate }
              </Form.Text>
              <Form.Text muted className='col-auto ml-3'>
                { this.props.startdate }
              </Form.Text>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Text className='col-auto mr-auto' >
                { PrelimPage.prompts().attendance }
              </Form.Text>
              <Form.Text muted className='col-auto ml-3'>
                { this.props.attendance }
              </Form.Text>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Text className='col-auto mr-auto' >
                { PrelimPage.prompts().overtime }
              </Form.Text>
              <Form.Text muted className='col-auto ml-3'>
                { this.props.overtime }
              </Form.Text>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Text className='col-auto mr-auto' >
                { PrelimPage.prompts().travel }
              </Form.Text>
              <Form.Text muted className='col-auto ml-3'>
                { this.props.travel }
              </Form.Text>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Form.Text className='col-auto mr-auto' >
                { PrelimPage.prompts().prevemployed }
              </Form.Text>
              <Form.Text muted className='col-auto ml-3'>
                      { this.props.prevemployed === 'yes' ? 'Yes' : ( this.props.prevemployed === 'no' ? 'No' : ( '<undefined>' ) ) }
              </Form.Text>
            </Form.Row>
          </Form.Group>

            <Form.Group>
              <Form.Row>
                <Form.Text className='col-auto mr-auto' >
                  { PrelimPage.prompts().emplauthorization }
                </Form.Text>
                <Form.Text muted className='col-auto ml-3'>
                      { this.props.emplauthorization === 'yes' ? 'Yes' : ( this.props.emplauthorization === 'no' ? 'No' : ( '<undefined>' ) ) }
                </Form.Text>
              </Form.Row>
            </Form.Group>

              <Form.Group>
                <Form.Row>
                  <Form.Text className='col-auto mr-auto' >
                    { PrelimPage.prompts().workpermit }
                  </Form.Text>
                  <Form.Text muted className='col-auto ml-3'>
                      { this.props.workpermit === 'yes' ? 'Yes' : ( this.props.workpermit === 'no' ? 'No' : ( '<undefined>' ) ) }
                  </Form.Text>
                </Form.Row>
              </Form.Group>

                <Form.Group>
                  <Form.Row>
                    <Form.Text className='col-auto mr-auto' >
                      { PrelimPage.prompts().crime }
                    </Form.Text>
                    <Form.Text muted className='col-auto ml-3'>
                      { this.props.crime === 'yes' ? 'Yes' : ( this.props.crime === 'no' ? 'No' : ( '<undefined>' ) ) }
                    </Form.Text>
                  </Form.Row>
                </Form.Group>

                  { this.props.crime === 'yes' && (
                    <Form.Group>
                      <Form.Row>
                        <Form.Text className='col-auto mr-auto' >
                          { PrelimPage.prompts().crimeexplanation }
                        </Form.Text>
                        <Form.Text muted className='col-auto ml-3'>
                          { this.props.crimeexplanation }
                        </Form.Text>
                      </Form.Row>
                    </Form.Group>
                  )}

                  <Form.Group>
                    <Form.Row>
                      <Form.Text className='col-auto mr-auto' >
                        { PrelimPage.prompts().dlnumber }
                      </Form.Text>
                      <Form.Text muted className='col-auto ml-3'>
                        { this.props.dlnumber } </Form.Text>
                    </Form.Row>
                  </Form.Group>

                  <Form.Group>
                    <Form.Row>
                      <Form.Text className='col-auto mr-auto' >
                        { PrelimPage.prompts().referred }
                      </Form.Text>
                      <Form.Text muted className='col-auto ml-3'>
                        { this.props.referred }
                      </Form.Text>
                    </Form.Row>
                  </Form.Group>

        </Form.Group>

      </Card>
                  )
                  }
                  }
