import React from 'react'
import Navbar from './components/Navbar'
import Weights from './components/Weights'
import { Card, Container, Header, Form, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class HomeLayout extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        <div id="title">
          Project Name
        </div>

        <video poster="/static/poster.png" id="bgvid" playsInline muted autoPlay loop>
          <source src="/static/video.mp4#t=8.5" type="video/mp4" />
          <source src="/static/video.webm#t=8.5" type="video/webm" />
        </video>
        <div id="weights">
          <Container>
            <Segment inverted>
              <Weights {...this.props} />
            </Segment>
          </Container>
          <Form.Group>
            <Form.Input width={6} transparent disabled />
            <Form.Button width={5} primary content={<Link style={{ color: 'white' }} to="/team_builder">Start building your team!</Link>} />
          </Form.Group>
        </div>
      </div>
    )
  }
}

export default HomeLayout