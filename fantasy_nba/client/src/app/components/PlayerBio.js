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
      playerStats: null
    }
  }

  componentWillMount() {

    this.getPlayer(this.props.playerID)
    // this.getPlayerDetails(this.props.playerID)
  }

  updatePlayerStats() {
    this.setState({
      playerStats: {
        stats: {
          season: {
            pts: 23,
            reb: 21,
            ast: 24,
            stl: 21,
            blk: 28,
            fgpct: 28,
            ftpct: 28,
            pt3pct: 28,
            tov: 28,
          },
          last5: {
            pts: 23,
            reb: 21,
            ast: 24,
            stl: 21,
            blk: 28,
            fgpct: 28,
            ftpct: 28,
            pt3pct: 28,
            tov: 28,
          }
        }
      }
    })
  }

  getPlayerTeam(teamID) {
    const baseURL = ""
    axios.get(baseURL + "/api/team/" + teamID)
      .then(res => {
        this.setState({
          playerTeam: res.data
        }, () => this.updatePlayerStats())
      })
  }

  getPlayer(playerID) {
    const baseURL = ""
    let player = null
    axios.get(baseURL + "/api/player/" + playerID)
      .then(res => {
        this.setState({
          player: res.data
        }, () => this.getPlayerTeam(this.state.player.currTeamID))
      })
    return player
  }

  getPlayerDetails(playerID) {
    this.setState({
      player: {
        name: "LeBron James",
        imageURL: "https://d2cwpp38twqe55.cloudfront.net/req/201711161/images/players/jamesle01.jpg",
        dob: "31st Feb 2018",
        height: "6-8",
        weight: 108,
        shoots: "Right",
        highSchool: "Akron High School, Ohio",
        team: {
          name: "Cleveland Cavaliers",
          imageURL: "https://d2p3bygnnzw9w3.cloudfront.net/req/201712011/tlogo/bbr/CLE-2018.png"
        },
        position: "SG",
        draft: "1993 Cleveland Cavaliers",
        experience: "13 Years",
        debut: "1994-95 Season",
        stats: {
          season: {
            pts: 23,
            reb: 21,
            ast: 24,
            stl: 21,
            blk: 28,
            fgpct: 28,
            ftpct: 28,
            pt3pct: 28,
            tov: 28,
          },
          last5: {
            pts: 23,
            reb: 21,
            ast: 24,
            stl: 21,
            blk: 28,
            fgpct: 28,
            ftpct: 28,
            pt3pct: 28,
            tov: 28,
          }
        }
      }
    })
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
        <PlayerStats {...playerStats} />
      </div>
    )
  }
}

const PlayerInfo = ({ player }) => {
  return !player ? "" : (
    <Card>
      <Card.Content>
        <Image floated="left" width={120} src={player.imageURL} />
        <Card.Header>{player.name}</Card.Header>
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
        <Card.Header>{team.teamName}</Card.Header>
        <br />
        <strong>Draft:</strong> {player.draft}<br />
        <strong>NBA Debut:</strong> {player.debut}<br />
        <strong>Experience:</strong> {player.experience}<br />
      </Card.Content>
    </Card>
  )
}

const PlayerStats = ({ stats }) => {
  return !stats ? "" : (
    <Segment>
      <Header>Player Stats</Header>
      <Table definition striped celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            {_.map(stats.season, (val, key) => (
              <Table.HeaderCell key={key}>{key.toUpperCase().replace("PCT", "%").replace("PT3", "3PT")}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Current Season</Table.Cell>
            {_.map(stats.season, (val, key) => (
              <Table.Cell key={key + "-" + val}>{val}</Table.Cell>
            ))}
          </Table.Row>
          <Table.Row>
            <Table.Cell>Last 5 Games</Table.Cell>
            {_.map(stats.last5, (val, key) => (
              <Table.Cell key={key + "-" + val}>{val}</Table.Cell>
            ))}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  )
}

export default PlayerBio;