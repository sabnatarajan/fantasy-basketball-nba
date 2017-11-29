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
        STL: 0,
        TOV: 0,
        MPG: 0,
        GS: 0,
        PS: 0,
        OFFSc: 0,
        DEFSc: 0,
        XPL: 0,
      }
    }
  }

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })
  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })

  handleChange(e, { name, value }) {
    console.log(e, { name, value })
    // console.log()
    this.setState({
      weights: { ...this.state.weights, [name]: value }
    })
  }

  render() {
    const { visible, active } = this.state

    return (
      <div>
        {visible ? <FixedMenu /> : null}

        <Container>
          <Menu inverted secondary size='large'>
            <Menu.Item as="h1">Fantasy NBA</Menu.Item>
            <Menu.Item onClick={this.handleOpen}>Weights</Menu.Item>
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
                  <Form.Input inline label='STL' value={this.state.weights.STL} name='STL' onChange={this.handleChange.bind(this)} placeholder='Enter STL wt.' type='number' />
                  <Form.Input inline label='TOV' value={this.state.weights.TOV} name='TOV' onChange={this.handleChange.bind(this)} placeholder='Enter TOV wt.' type='number' />
                  <Form.Input inline label='MPG' value={this.state.weights.MPG} name='MPG' onChange={this.handleChange.bind(this)} placeholder='Enter MPG wt.' type='number' />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input inline label='DEFSc' value={this.state.weights.DEFSc} name='DEFSc' onChange={this.handleChange.bind(this)} placeholder='Enter DEFSc wt.' type='number' />
                  <Form.Input inline label='OFFSc' value={this.state.weights.OFFSc} name='OFFSc' onChange={this.handleChange.bind(this)} placeholder='Enter OFFSc wt.' type='number' />
                  <Form.Input inline label='XPL' value={this.state.weights.XPL} name='XPL' onChange={this.handleChange.bind(this)} placeholder='Enter XPL wt.' type='number' />
                  <Form.Input inline label='GS' value={this.state.weights.GS} name='GS' onChange={this.handleChange.bind(this)} placeholder='Enter GS wt.' type='number' />
                  <Form.Input inline label='PS' value={this.state.weights.PS} name='PS' onChange={this.handleChange.bind(this)} placeholder='Enter PS wt.' type='number' />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Button type='submit'>Submit</Form.Button>
                  <Form.Button onClick={this.handleClose}>Close</Form.Button>
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