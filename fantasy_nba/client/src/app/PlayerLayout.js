import React from 'react';
import Navbar from './components/Navbar';
import PlayerBio from './components/PlayerBio';
import PlayerStats from './components/PlayerStats'
import PlayerGraphs from './components/PlayerGraphs'
import { Container } from 'semantic-ui-react'
import axios from 'axios'

class PlayerLayout extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      seasonStats: null,
      last5Stats: null
    }
  }

  componentWillMount() {
    this.getPlayerStats(this.props.playerID)
  }

  baseURL = process.env.NODE_ENV === "production" ? "" : "http://localhost:8000"  

  getPlayerStats(playerID) {
    axios.get(this.baseURL + '/api/player/' + playerID + '/stats/season')
      .then(res => {
        _.map(res.data, (data) => {
          data.pt3pct = 100 * (data.pt3A == 0 ? 0 : data.pt3M / data.pt3A)
          data.ftpct = 100 * (data.ftA == 0 ? 0 : data.ftM / data.ftA)
          data.fgpct = 100 * (data.fgA == 0 ? 0 : data.fgM / data.fgA)
        })
        this.setState({
          seasonStats: res.data
        })
      })
    axios.get(this.baseURL + '/api/player/' + playerID + '/stats/last5')
      .then(res => {
        _.map(res.data, (data) => {
          data.pt3pct = 100 * (data.pt3A == 0 ? 0 : data.pt3M / data.pt3A)
          data.ftpct = 100 * (data.ftA == 0 ? 0 : data.ftM / data.ftA)
          data.fgpct = 100 * (data.fgA == 0 ? 0 : data.fgM / data.fgA)
        })
        this.setState({
          last5Stats: res.data
        })
      })
  }

  render() {
    return (
      <div>
        <Navbar title="Fantasy NBA" {...this.props}/>
        <Container>
          <PlayerBio playerID={this.props.playerID} />
          <PlayerStats playerID={this.props.playerID} {...this.state}/>
          <PlayerGraphs playerID={this.props.playerID} {...this.state} {...this.props} />
        </Container>
      </div>
    );
  }
}

export default PlayerLayout;