import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Container, Header, Icon, Image, Segment, Table } from 'semantic-ui-react'
import axios from 'axios'

class PlayerBio extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      player: null,
      playerTeam: null,
    }
  }

  componentWillMount() {

    this.getPlayer(this.props.playerID)
  }

  getPlayerTeam(teamID) {
    const baseURL = process.env.NODE_ENV === "production" ? "" : "http://localhost:8000"
    axios.get(baseURL + "/api/team/" + teamID)
      .then(res => {
        this.setState({
          playerTeam: res.data
        })
      })
  }

  getPlayer(playerID) {
    const baseURL = process.env.NODE_ENV === "production" ? "" : "http://localhost:8000"
    let player = null
    axios.get(baseURL + "/api/player/" + playerID)
      .then(res => {
        this.setState({
          player: res.data
        }, () => this.getPlayerTeam(this.state.player.currTeamID))
      })
    return player
  }

  render() {
    const { player, playerTeam, playerStats } = this.state
    // return ""
    return (
      <div id='player-bio'>
        <Card.Group itemsPerRow={2}>
          <PlayerInfo player={player} />
          <PlayerTeamInfo player={player} team={playerTeam} />
        </Card.Group>
      </div>
    )
  }
}

const PlayerInfo = ({ player }) => {
  return !player ? "" : (
    <Card>
      <Card.Content>
        <Image floated="left" width={120} src={player.imageURL} />
        <Card.Header as="h1" size="huge">{player.name}</Card.Header>
        <br />
        <strong>Position:</strong> {player.position}<br />
        <strong>Date of Birth:</strong> {player.dob}<br />
        <strong>Height:</strong> {player.height}<br />
        <strong>Weight:</strong> {player.weight} lbs.<br />
        <strong>Shoots:</strong> {player.shoots}<br />
        <strong>{player.college ? "College" : "High School"}:</strong> {player.college ? player.college : player.highSchool}<br />
      </Card.Content>
    </Card>
  )
}

const PlayerTeamInfo = ({ player, team }) => {
  return !player || !team ? "" : (
    <Card>
      <Card.Content>
        <Image floated="left" width={120} src={team.teamImageURL} />
        <Card.Header as="h2">{team.TeamName}</Card.Header>
        <br />
        <strong>Draft:</strong> {player.draft}<br />
        <strong>NBA Debut:</strong> {player.debut}<br />
        <strong>Experience:</strong> {player.experience}<br />
      </Card.Content>
    </Card>
  )
}

export default PlayerBio;