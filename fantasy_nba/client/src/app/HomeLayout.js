import React from 'react'
import Navbar from './components/Navbar'
import Weights from './components/Weights'
import { Card, Container, Header, Form, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class HomeLayout extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    let vid = document.getElementById('bgvid')
    console.log(vid.currentTime)
    vid.currentTime = 8.5
  }

  render() {
    const baseURL = process.env.NODE_ENV === "production" ? "/static" : ""
    return (
      <div>
        <Container>
          <div id="title">
            <Header as="h1" className="white-text" textAlign="center" size="huge">Fantasy Hoops</Header>
          </div>

          <div id="weights">
            <Segment textAlign="center" basic>
              <Weights {...this.props} />
              <Link to='/team_builder'><Form.Button color="blue" content="Start building your team!"/></Link>
            </Segment>
          </div>
        </Container>
        <video poster={baseURL + "/poster.png"} id="bgvid" playsInline muted autoPlay loop>
          <source src={baseURL + "/video.mp4#t=8.5"} type="video/mp4" />
          <source src={baseURL + "/video.webm#t=8.5"} type="video/webm" />
        </video>
      </div>
    )
  }
}

export default HomeLayout