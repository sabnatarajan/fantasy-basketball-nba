import React from 'react'
import _ from 'lodash'
import Navbar from './components/Navbar'
import { Button, Header, Container } from 'semantic-ui-react'
import PlayerGrid from './components/PlayerGrid'
import axios from 'axios'

class TeamBuilderLayout extends React.Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      team: props.team,
      players: props.players,
      filteredPlayers: _.difference(props.players, props.team)
    }
  }

  MAX_ROSTER_SIZE = 100

  setStateOnParent(nextState) {
    this.props.setStateCallback(nextState)
  }

  componentWillMount() {

    // this.getOfflinePlayerData()
    if (!this.state.players)
      this.getOnlinePlayerData()

  }

  handleClick = filterPosition => () => {

    let availablePlayers = _.difference(this.state.players, this.state.team)
    if (filterPosition === 'ALL') {
      this.setState({
        filteredPlayers: _.difference(this.state.players, this.state.team)
      }, this.setStateOnParent(this.state))
    }
    else {
      this.setState({
        filteredPlayers: _.filter(availablePlayers, { 'position': filterPosition })
      }, this.setStateOnParent(this.state))
    }
  }

  getOnlinePlayerData() {
    let baseURL = ""

    axios.get(baseURL + '/api/players')
      .then(res => {
        this.setState({
          players: res.data,
          filteredPlayers: res.data
        })
      })
  }

  getOfflinePlayerData() {
    let offline_players = [
      {
        playerID: "jamesle01", name: 'LeBron James', position: "PG", team: "CLE", starter: 1, avMPG: "38:44",
        avDefScPG: 80, avOffScPG: 100, avCostPerDefSc: 403, avCostPerOffSc: 251, explosiveness: 90,
        avScPG: 76, gamesNextWeek: 2, projectedSc: 82
      },
      {
        playerID: "duncanti01", name: 'Tim Duncan', position: "PF", team: "SAS", starter: 1, avMPG: "38:44",
        avDefScPG: 81, avOffScPG: 10, avCostPerDefSc: 400, avCostPerOffSc: 210, explosiveness: 90,
        avScPG: 76, gamesNextWeek: 2, projectedSc: 82
      },
      {
        playerID: "bryantko01", name: 'Kobe Bryant', position: "SG", team: "LAL", starter: 1, avMPG: "38:44",
        avDefScPG: 82, avOffScPG: 103, avCostPerDefSc: 380, avCostPerOffSc: 214, explosiveness: 90,
        avScPG: 76, gamesNextWeek: 2, projectedSc: 82
      },
      {
        playerID: "duranke01", name: 'Kevin Durant', position: "SF", team: "CLE", starter: 1, avMPG: "38:44",
        avDefScPG: 83, avOffScPG: 113, avCostPerDefSc: 401, avCostPerOffSc: 215, explosiveness: 90,
        avScPG: 76, gamesNextWeek: 2, projectedSc: 82
      },
    ]
    this.setState({
      players: offline_players,
      filteredPlayers: offline_players
    })
  }

  updateTeam = (playerID, addPlayer) => {
    if (this.state.team) {
      if (addPlayer && this.state.team.length >= this.MAX_ROSTER_SIZE) {
        alert("You have reached the limit on roster size.")
        return
      }
    }
    let player = _.filter(this.state.players, { 'playerID': playerID })
    if (addPlayer) {
      this.setState(
        {
          team: _.union(this.state.team, player),
          filteredPlayers: _.difference(this.state.filteredPlayers, player)
        }
        , () => this.props.setStateCallback(this.state))
    } else {
      this.setState({
        team: _.difference(this.state.team, player),
        filteredPlayers: _.union(this.state.filteredPlayers, player)
      },
        () => this.props.setStateCallback(this.state))
    }
  }

  render() {
    return (
      <div>
        <Navbar title="Fantasy NBA" {...this.props} />
        <Container>
          <Header as='h3'>My Team</Header>
          <PlayerGrid data={this.state.team} updateTeamCallback={this.updateTeam} checked={true} />

          <Header as='h3'>Players</Header>
          <div style={{ marginBottom: '24px' }}>
            <b style={{ color: 'white', marginRight: '5px' }}>Player Positions</b>
            <Button.Group>
              <Button toggle onClick={this.handleClick('ALL')}>All</Button>
              <Button toggle onClick={this.handleClick('PG')}>PG</Button>
              <Button toggle onClick={this.handleClick('PF')}>PF</Button>
              <Button toggle onClick={this.handleClick('SG')}>SG</Button>
              <Button toggle onClick={this.handleClick('SF')}>SF</Button>
              <Button toggle onClick={this.handleClick('C')}>C</Button>
            </Button.Group>
          </div>
          <PlayerGrid data={this.state.filteredPlayers} updateTeamCallback={this.updateTeam} checked={false} paginateEntries={2} />
        </Container>
      </div>
    )
  }
}

export default TeamBuilderLayout