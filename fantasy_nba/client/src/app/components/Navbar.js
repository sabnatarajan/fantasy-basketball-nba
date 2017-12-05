import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Container, Dimmer, FixedMenu, Form, Header, Label, Menu, Visibility } from 'semantic-ui-react'
import Weights from './Weights'

class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
    }
  }

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })
  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })

  areWeightsSet() {
    // TODO: Complete this functionality
    return true // Remove this when you complete
    _.apply(this.state.weights, (i) => { console.log(i); return i == 0 })
  }

  render() {
    const { visible, active, weights } = this.state

    return (

      <div>
        {visible ? <FixedMenu /> : null}

        <Container>
          <Menu inverted secondary size='large'>
            <Menu.Item as="h1"><Link to="">Fantasy NBA</Link></Menu.Item>
            <Menu.Item><Link onClick={this.handleOpen} to="#">Weights</Link>
              {this.areWeightsSet() ? "" : <Label basic color='red' pointing='left'>Enter your league's weights</Label>}
            </Menu.Item>
            <Menu.Item><Link to='/team_builder'>Team Builder</Link></Menu.Item>
          </Menu>
        </Container>

        <Dimmer active={active} onClickOutside={this.handleClose}>
          <Weights {...this.props} />
        </Dimmer>
      </div >
    )
  }
}

export default Navbar;