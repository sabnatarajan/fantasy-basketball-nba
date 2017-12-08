import React from 'react'
import _ from 'lodash'
import Navbar from './components/Navbar'
import { Button, Card, Header, Image, Container, Segment, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PlayerGrid from './components/PlayerGrid'
import axios from 'axios'

class TeamBuilderLayout extends React.Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      column: null,
      direction: null,
      team: props.team,
      players: props.players,
      filteredPlayers: _.difference(props.players, props.team)
    }
  }

  MAX_ROSTER_SIZE = 13

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
    const baseURL = process.env.NODE_ENV === "production" ? "" : "http://localhost:8000"
    axios.get(baseURL + '/api/players')
      .then(res => {
        this.setState({
          players: res.data,
          filteredPlayers: res.data
        }, () => this.setStateOnParent(this.state))
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
      const { column, data, direction } = this.state
      this.setState({
        team: _.difference(this.state.team, player),
        filteredPlayers: _.union(this.state.filteredPlayers, player)
      },
        () => this.props.setStateCallback(this.state))
    }
  }

  sortPlayers = (clickedColumn) => {
    if (!this.state) {
      console.log('kjasdlkj state', this.state)
      return
    }
    const { column, players, direction } = this.state
    console.log('sort called on teambuilder', clickedColumn, direction)
    // console.log(this.state.players)

    console.log(_.sortBy(players, [clickedColumn]).reverse())

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        players: _.sortBy(players, [clickedColumn]).reverse(),
        direction: 'descending',
      })

      return
    }

    this.setState({
      players: players.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {

    let teamChosen = true
    if (!this.state.team || this.state.team.length == 0) {
      teamChosen = false
    }

    const totalProjectedPoints = _.sumBy(this.state.team, 'projFPts')
    const xFactorPlayer = _.maxBy(this.state.team, 'projFPts')
    const ROI = _.maxBy(this.state.team, 'avFPtsPer$')
    const xDefPlayer = _.maxBy(this.state.team, 'avDefFPts')
    const xOffPlayer = _.maxBy(this.state.team, 'avOffFPts')
    const teamRatio = _.sumBy(this.state.team, 'avOffFPts') / _.sumBy(this.state.team, 'avDefFPts')
    const teamInclination = teamRatio < 0.5 ? "def2" : teamRatio < 0.8 ? "def1" : teamRatio > 3 ? "off2" : teamRatio > 1.2 ? "off1" : "bal"
    const teamInclin = teamInclination + ".png"
    const allStarPlayer = _.maxBy(this.state.team, 'zScores')
    const totCost = _.sumBy(this.state.team, 'cost')

    return (
      <div>
        <Navbar title="Fantasy NBA" {...this.props} />
        <Container>
          <Header className="white-text" as='h3'>My Team</Header>

          {/* <Segment clearing compact>
            <table style={{float:"left", marginRight: '24px'}}>
              <tbody>
                <tr>
                  <td>Total Projected Points Next Week</td>
                  <td>{totalProjectedPoints}</td>
                </tr>
                <tr>
                  <td>Next Week's All-Star</td>
                  <td>{123}</td>
                </tr>
              </tbody>
            </table>
            <Image floated='right' src={teamInclin} height={60} />
          </Segment> */}
          <div style={{ marginBottom: '24px' }}>
            {teamChosen ? (
              <Card.Group itemsPerRow={2}>
                <Card>
                  <Card.Content>
                    <Image floated='right' src={teamInclin} height={60} />
                    <strong>Total Projected Points Next Week: </strong>{totalProjectedPoints}
                    <br />
                    <strong>Next Week's All-Star: </strong>{allStarPlayer.name}
                    <br />
                    <strong>X-Factor Player Next Week: </strong><Link to={'/player/' + xFactorPlayer.playerID}>{xFactorPlayer.name}</Link>
                    <br />
                    <strong>Highest ROI Player: </strong><Link to={'/player/' + ROI.playerID}>{ROI.name}</Link>
                    <br />
                    <strong>Strongest Defensive Player: </strong><Link to={'/player/' + xDefPlayer.playerID}>{xDefPlayer.name}</Link>
                    <br />
                    <strong>Strongest Offensive Player: </strong><Link to={'/player/' + xOffPlayer.playerID}>{xOffPlayer.name}</Link>
                    <br />
                    <strong>Team Inclination: </strong>{teamInclination}
                    <br />
                    <strong>Total Cost: </strong>{totCost}
                  </Card.Content>
                </Card>
              </Card.Group>
            ) : ""}
          </div>

          <PlayerGrid
            data={this.state.team}
            weights={this.props.weights}
            {...this.props}
            sortCallback={this.sortPlayers}
            updateTeamCallback={this.updateTeam}
            checked={true}
          />

          <Header className="white-text" as='h3'>Players</Header>
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
          <PlayerGrid
            data={_.difference(this.state.players, this.state.team)}
            weights={this.props.weights}
            {...this.props}
            sortCallback={this.sortPlayers}
            updateTeamCallback={this.updateTeam}
            checked={false}
          />
        </Container>
      </div>
    )
  }
}

export default TeamBuilderLayout