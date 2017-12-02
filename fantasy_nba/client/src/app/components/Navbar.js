import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Container, Dimmer, FixedMenu, Form, Header, Menu, Visibility } from 'semantic-ui-react'

class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      weights: {
        PTS: 0,
        REB: 0,
        AST: 0,
        STL: 0,
        BLK: 0,
        FGPCT: 0,
        FTPCT: 0,
        PT3PCT: 0,
        TOV: 0,
      }
    }
  }

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })
  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })

  handleChange(e, { name, value }) {
    this.setState({
      weights: { ...this.state.weights, [name]: value }
    },
      () => this.props.setStateCallback(this.state)
    )
  }

  render() {
    const { visible, active, weights } = this.state

    return (

      <div>
        {visible ? <FixedMenu /> : null}

        <Container>
          <Menu inverted secondary size='large'>
            <Menu.Item as="h1">Fantasy NBA</Menu.Item>
            <Menu.Item><Link onClick={this.handleOpen} to="#">Weights</Link></Menu.Item>
            <Menu.Item><Link to='/team_builder'>Team Builder</Link></Menu.Item>
          </Menu>
        </Container>

        <Dimmer active={active} onClickOutside={this.handleClose}>
          <Header as='h2' icon inverted>
            <Container>
              <Form size='mini'>
                <Form.Group widths='equal'>
                  <Form.Input inline label='PTS' value={this.state.weights.PTS} name='PTS' onChange={this.handleChange.bind(this)} placeholder='Enter PTS wt.' type='number' />
                  <Form.Input inline label='REB' value={this.state.weights.REB} name='REB' onChange={this.handleChange.bind(this)} placeholder='Enter REB wt.' type='number' />
                  <Form.Input inline label='AST' value={this.state.weights.AST} name='AST' onChange={this.handleChange.bind(this)} placeholder='Enter AST wt.' type='number' />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input inline label='STL' value={this.state.weights.STL} name='STL' onChange={this.handleChange.bind(this)} placeholder='Enter TOV wt.' type='number' />
                  <Form.Input inline label='BLK' value={this.state.weights.BLK} name='BLK' onChange={this.handleChange.bind(this)} placeholder='Enter BLK wt.' type='number' />
                  <Form.Input inline label='FG%' value={this.state.weights.FGPCT} name='FGPCT' onChange={this.handleChange.bind(this)} placeholder='Enter FG% wt.' type='number' />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input inline label='FT%' value={this.state.weights.FTPCT} name='FTPCT' onChange={this.handleChange.bind(this)} placeholder='Enter FT% wt.' type='number' />
                  <Form.Input inline label='3PT%' value={this.state.weights.PT3PCT} name='PT3PCT' onChange={this.handleChange.bind(this)} placeholder='Enter 3PT% wt.' type='number' />
                  <Form.Input inline label='TOV' value={this.state.weights.TOV} name='TOV' onChange={this.handleChange.bind(this)} placeholder='Enter TOV wt.' type='number' />
                </Form.Group>
              </Form>
            </Container>
          </Header>
        </Dimmer>
      </div>
    )
  }
}

export default Navbar;