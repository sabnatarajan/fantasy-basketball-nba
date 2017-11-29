import React from 'react'
import _ from 'lodash'
import Navbar from './components/Navbar'
import Team from './components/Team'
import { Header, Container } from 'semantic-ui-react'
import PlayerGrid from './components/PlayerGrid'

class TeamBuilderLayout extends React.Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      team: null,
      players: this.getPlayerData()
    }
  }

  getPlayerData() {
    return [
      {
        playerID: "jamesle01", name: 'LeBron James', position: "PG", team: "CLE", starter: 1, avMinPlayedPG: "38:44",
        avDefScPG: 80, avOffScPG: 100, avCostPerDefSc: 403, avCostPerOffSc: 251, explosiveness: 90,
        avScPG: 76, gamesNextWeek: 2, projectedSc: 82
      },
      {
        playerID: "duncanti01", name: 'Tim Duncan', position: "PF", team: "SAS", starter: 1, avMinPlayedPG: "38:44",
        avDefScPG: 81, avOffScPG: 10, avCostPerDefSc: 400, avCostPerOffSc: 210, explosiveness: 90,
        avScPG: 76, gamesNextWeek: 2, projectedSc: 82
      },
      {
        playerID: "bryantko01", name: 'Kobe Bryant', position: "SG", team: "LAL", starter: 1, avMinPlayedPG: "38:44",
        avDefScPG: 82, avOffScPG: 103, avCostPerDefSc: 380, avCostPerOffSc: 214, explosiveness: 90,
        avScPG: 76, gamesNextWeek: 2, projectedSc: 82
      },
      {
        playerID: "duranke01", name: 'Kevin Durant', position: "SF", team: "CLE", starter: 1, avMinPlayedPG: "38:44",
        avDefScPG: 83, avOffScPG: 113, avCostPerDefSc: 401, avCostPerOffSc: 215, explosiveness: 90,
        avScPG: 76, gamesNextWeek: 2, projectedSc: 82
      },
    ]
  }

  updateTeam = (playerID, addPlayer) => {
    let playerToRemove = _.filter(this.state.players, { 'playerID': playerID })
    if (addPlayer) {
      this.setState(
        {
          team: _.union(this.state.team, playerToRemove)
        }
      )
    } else {
      this.setState({
        team: _.difference(this.state.team, playerToRemove)
      })
    }
  }

  render() {
    return (
      <div>
        <Navbar title="Fantasy NBA" />
        <Container>
          <Header as='h3'>My Team</Header>
          <Team data={this.state.team} />

          <Header as='h3'>Players</Header>
          <PlayerGrid data={this.state.players} updateTeamCallback={this.updateTeam} />
        </Container>
      </div>
    )
  }
}

export default TeamBuilderLayout