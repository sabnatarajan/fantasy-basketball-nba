import React from 'react'
import { Link } from 'react-router-dom';
import { FixedMenu, Menu, Container, Button, Visibility } from 'semantic-ui-react'

class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render1() {
    return (
      <nav>
        <div className="nav-wrapper">
          {/* <a href="#" className="brand-logo">{this.props.title}</a> */}
          <Link to='/' className="brand-logo">{this.props.title}</Link>
        </div>
      </nav>
    )
  }

  state = {}

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })

  render() {
    const { visible } = this.state

    return (
      <div>
        {visible ? <FixedMenu /> : null}

        <Container>
          <Menu inverted secondary size='large'>
            <Menu.Item as="h1">Fantasy NBA</Menu.Item>
            <Menu.Item><Link to='/weights'>Weights</Link></Menu.Item>
            <Menu.Item><Link to='/team_builder'>Team Builder</Link></Menu.Item>
          </Menu>
        </Container>
      </div>
    )
  }
}

export default Navbar;