import React from 'react'
import { Form, Container } from 'semantic-ui-react'
import Navbar from './components/Navbar'

class WeightsLayout extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        <Navbar title="Fantasy NBA" />
        <Container>
          <Form>
            <Form.Group widths={2}>
              <Form.Input label='PTS' placeholder='Enter PTS' type='number' />
              <Form.Input label='REB' placeholder='Enter PTS' type='number' />
              <Form.Input label='MPG' placeholder='Enter PTS' type='number' />
              <Form.Input label='STL' placeholder='Enter PTS' type='number' />
              <Form.Input label='STL' placeholder='Enter PTS' type='number' />
              <Form.Input label='STL' placeholder='Enter PTS' type='number' />
              <Form.Input label='STL' placeholder='Enter PTS' type='number' />
              <Form.Input label='STL' placeholder='Enter PTS' type='number' />
              <Form.Input label='STL' placeholder='Enter PTS' type='number' />
            </Form.Group>
            <Form.Button>Submit</Form.Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default WeightsLayout