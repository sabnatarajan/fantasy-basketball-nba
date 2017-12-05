import React from 'react'
import { Button, Container, Form, Header } from 'semantic-ui-react'

class Weights extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      weights: {
        PTS: 0.5,
        FGA: -0.45,
        FGM: 1,
        PT3M: 3,
        FTA: -0.75,
        FTM: 1,
        REBTot: 1.5,
        STL: 3,
        BLK: 3,
        AST: 2,
        TOV: -2,
      },
      league: null
    }
  }

  handleChange(e, { name, value }) {
    this.setState({
      weights: { ...this.state.weights, [name]: Number(value) }
    },
      () => this.props.setStateCallback(this.state)
    )
  }

  setLeague(e, { value }) {
    this.setState({
      league: value
    }, () => this.props.setStateCallback(this.state))
  }

  render() {
    const weights = this.state.weights
    const leagueOptions = [
      { key: 'NONE', value: 'NONE', text: 'None' },
      { key: 'ESP', value: 'ESP', text: 'ESPN' },
      { key: 'YAH', value: 'YAH', text: 'Yahoo' }
    ]
    return (
      <Container>
        {/* <Header icon inverted> */}
        <Form size='small'>
          <Form.Group widths='equal'>
            <Form.Input transparent disabled />
            <Form.Select placeholder='Select your league' options={leagueOptions} onChange={this.setLeague.bind(this)} />
            <Form.Input transparent disabled />
          </Form.Group>
          <Form.Group>
            <Form.Input width={2} transparent disabled />
            <Form.Input width={2} label='PTS' value={weights.PTS} name='PTS' onChange={this.handleChange.bind(this)} placeholder='Enter PTS wt.' type="number" />
            <Form.Input width={2} label='FGA' value={weights.FGA} name='FGA' onChange={this.handleChange.bind(this)} placeholder='Enter FGA wt.' type="number" />
            <Form.Input width={2} label='FGM' value={weights.FGM} name='FGM' onChange={this.handleChange.bind(this)} placeholder='Enter FGM wt.' type="number" />
            <Form.Input width={2} label='3PT%' value={weights.PT3M} name='PT3M' onChange={this.handleChange.bind(this)} placeholder='Enter 3PTM wt.' type="number" />
            <Form.Input width={2} label='FTA' value={weights.FTA} name='FTA' onChange={this.handleChange.bind(this)} placeholder='Enter FTA wt.' type="number" />
            <Form.Input width={2} label='FTM' value={weights.FTM} name='FTM' onChange={this.handleChange.bind(this)} placeholder='Enter FTM wt.' type="number" />
          </Form.Group>
          <Form.Group>
            <Form.Input width={3} transparent disabled />
            <Form.Input width={2} label='REB' value={weights.REBTot} name='REBTot' onChange={this.handleChange.bind(this)} placeholder='Enter REB wt.' type="number" />
            <Form.Input width={2} label='STL' value={weights.STL} name='STL' onChange={this.handleChange.bind(this)} placeholder='Enter STL wt.' type="number" />
            <Form.Input width={2} label='BLK' value={weights.BLK} name='BLK' onChange={this.handleChange.bind(this)} placeholder='Enter BLK wt.' type="number" />
            <Form.Input width={2} label='AST' value={weights.AST} name='AST' onChange={this.handleChange.bind(this)} placeholder='Enter AST wt.' type="number" />
            <Form.Input width={2} label='TOV' value={weights.TOV} name='TOV' onChange={this.handleChange.bind(this)} placeholder='Enter TOV wt.' type="number" />
          </Form.Group>
        </Form>
        {/* </Header> */}
      </Container>
    )
  }
}

export default Weights