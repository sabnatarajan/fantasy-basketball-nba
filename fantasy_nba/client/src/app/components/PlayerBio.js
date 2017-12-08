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
        <table className="infoTable">
          <tbody>
            <tr>
              <td>Position</td>
              <td>{player.position}</td>
            </tr>
            <tr>
              <td>Date of Birth</td>
              <td>{player.dob}</td>
            </tr>
            <tr>
              <td>Height</td>
              <td>{player.height}</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>{player.weight} lbs.</td>
            </tr>
            <tr>
              <td>Shoots</td>
              <td>{player.shoots}</td>
            </tr>
            <tr>
              <td>{player.college ? "College" : "High School"}</td>
              <td>{player.college ? player.college : player.highschool}</td>
            </tr>
          </tbody>
        </table>
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
        <table className="infoTable">
          <tbody>
            <tr>
              <td>Draft</td>
              <td>{player.draft}</td>
            </tr>
            <tr>
              <td>NBA Debut</td>
              <td>{player.debut}</td>
            </tr>
            <tr>
              <td>Experience</td>
              <td>{player.experience}</td>
            </tr>
          </tbody>
        </table>
      </Card.Content>
    </Card>
  )
}

export default PlayerBio;