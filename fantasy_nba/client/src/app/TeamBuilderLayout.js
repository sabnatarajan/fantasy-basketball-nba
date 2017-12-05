import React from 'react'
import _ from 'lodash'
import Navbar from './components/Navbar'
import { Button, Card, Header, Image, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
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

  MAX_ROSTER_SIZE = 5

  setStateOnParent(nextState) {
    this.props.setStateCallback(nextState)
  }

  componentWillMount() {

    // this.getOfflinePlayerData()
    console.log('current state of players')
    console.log(this.state.players)
    if (!this.state.players) {
      console.log("Refreshing player list")
      this.getOnlinePlayerData()
    }
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

    let teamChosen = true
    if (!this.state.team || this.state.team.length == 0) {
      teamChosen = false
    }

    const totalProjectedPoints = _.sumBy(this.state.team, 'projFPts')
    const xFactorPlayer = _.maxBy(this.state.team, 'projFPts')
    const MVP = _.maxBy(this.state.team, 'avFPtsPer$')
    const xDefPlayer = _.maxBy(this.state.team, 'avDefFPts')
    const xOffPlayer = _.maxBy(this.state.team, 'avOffFPts')
    const teamRatio = _.sumBy(this.state.team, 'avOffFPts') / _.sumBy(this.state.team, 'avDefFPts')
    const teamInclination = teamRatio < 0.9 ? "defensive" : teamRatio > 1.1 ? "offensive" : "balanced"

    return (
      <div>
        <video poster="/poster.png" id="bgvid" playsInline muted autoPlay loop>
          <source src="/video.mp4#t=8.5" type="video/mp4" />
        </video>
        <Navbar title="Fantasy NBA" {...this.props} />
        <Container>
          <Header as='h3'>My Team</Header>

          <div style={{ marginBottom: '24px' }}>
            {teamChosen ? (
              <Card.Group itemsPerRow={2}>
                <Card>
                  <Card.Content>
                    <Image floated='right' src="http://placehold.it/48x48" />
                    <strong>Total Projected Points Next Week: </strong>{totalProjectedPoints}
                    <br />
                    <strong>X-Factor Player Next Week: </strong><Link to={'/player/' + xFactorPlayer.playerID}>{xFactorPlayer.name}</Link>
                    <br />
                    <strong>Most Valuable Player: </strong><Link to={'/player/' + MVP.playerID}>{MVP.name}</Link>
                    <br />
                    <strong>Strongest Defensive Player: </strong><Link to={'/player/' + xDefPlayer.playerID}>{xDefPlayer.name}</Link>
                    <br />
                    <strong>Strongest Offensive Player: </strong><Link to={'/player/' + xOffPlayer.playerID}>{xOffPlayer.name}</Link>
                    <br />
                    <strong>Team Inclination: </strong>{teamInclination}
                    <br />
                  </Card.Content>
                </Card>
              </Card.Group>
            ) : ""}
          </div>

          <PlayerGrid data={this.state.team} weights={this.props.weights} updateTeamCallback={this.updateTeam} checked={true} />

          <Header as='h3'>Players</Header>
          <div style={{ marginBottom: '24px' }}>
            <b style={{ color: 'white', marginRight: '5px' }}>Player Positions</b>
            <Button.Group>
              <Button toggle onClick={this.handleClick('PG')}>PG</Button>
              <Button toggle onClick={this.handleClick('PF')}>PF</Button>
              <Button toggle onClick={this.handleClick('SG')}>SG</Button>
              <Button toggle onClick={this.handleClick('SF')}>SF</Button>
              <Button toggle onClick={this.handleClick('C')}>C</Button>
              <Button toggle onClick={this.handleClick('ALL')}>All</Button>
            </Button.Group>
          </div>
          <PlayerGrid data={this.state.filteredPlayers} weights={this.props.weights} updateTeamCallback={this.updateTeam} checked={false} paginateEntries={2} />
        </Container>
      </div>
    )
  }
}

export default TeamBuilderLayout