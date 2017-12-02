import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Container, Header, Icon, Image, Segment, Table } from 'semantic-ui-react'
import axios from 'axios'

class PlayerBio extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      player: null
    }
  }

  componentWillMount() {
    // this.getPlayer(this.props.playerID)
    this.getPlayerDetails(this.props.playerID)
  }

  getPlayer(playerID) {
    axios.get("localhost:8000/api/player/" + playerID)
      .then(res => {
        this.setState({
          player: res.data
        })
      })
  }

  getPlayerDetails(playerID) {
    this.setState({
      player: {
        name: "LeBron James",
        imageURL: "/jamesle01.jpg",
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
    const { player } = this.state
    return (
      <div id='player-bio'>
        <Card.Group itemsPerRow={2}>
          <PlayerInfo player={player} />
          <PlayerTeamInfo player={player} />
        </Card.Group>
        <PlayerStats player={player} />
      </div>
    )
  }
}

const PlayerInfo = ({ player }) => {
  return (
    <Card>
      <Card.Content>
        <Image floated="left" width={120} src={player.imageURL} />
        <Card.Header>{player.name}</Card.Header>
        <br />
        <strong>Date of Birth:</strong> {player.dob}<br />
        <strong>Height:</strong> {player.height}<br />
        <strong>Weight:</strong> {player.weight} lbs.<br />
        <strong>Shoots:</strong> {player.shoots}<br />
        <strong>{player.college ? "College" : "High School"}:</strong> {player.college ? player.college : player.highSchool}<br />
      </Card.Content>
    </Card>
  )
}

const PlayerTeamInfo = ({ player }) => {
  return (
    <Card>
      <Card.Content>
        <Image floated="left" width={120} src={player.team.imageURL} />
        <Card.Header>{player.team.name}</Card.Header>
        <br />
        <strong>Draft:</strong> {player.draft}<br />
        <strong>NBA Debut:</strong> {player.debut}<br />
        <strong>Experience:</strong> {player.experience}<br />
        <strong>Position:</strong> {player.position}<br />
      </Card.Content>
    </Card>
  )
}

const PlayerStats = ({ player }) => {
  return (
    <Segment>
      <Header>Player Stats</Header>
      <Table definition striped celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            {_.map(player.stats.season, (val, key) => (
              <Table.HeaderCell key={key}>{key.toUpperCase().replace("PCT", "%").replace("PT3", "3PT")}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Current Season</Table.Cell>
            {_.map(player.stats.season, (val, key) => (
              <Table.Cell key={key + "-" + val}>{val}</Table.Cell>
            ))}
          </Table.Row>
          <Table.Row>
            <Table.Cell>Last 5 Games</Table.Cell>
            {_.map(player.stats.last5, (val, key) => (
              <Table.Cell key={key + "-" + val}>{val}</Table.Cell>
            ))}
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  )
}

export default PlayerBio;