import React from 'react'
import { Segment, Table, Header } from 'semantic-ui-react'
import axios from 'axios'

class PlayerStats extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      seasonStats: null,
      last5Stats: null
    }
  }

  componentWillMount() {
    
  }

  

  render() {
    const { seasonStats, last5Stats } = this.props
    return (
      <Segment>
        <Header color="black" textAlign="center" as="h3">Player Stats</Header>
        <Table definition striped celled compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              {
                _.map(['pts', 'rebOff', 'rebDef', 'ast', 'stl', 'blk', 'fgpct', 'ftpct', 'pt3pct', 'tov'], (label) => {
                  return <Table.HeaderCell key={label}>{label.toUpperCase().replace("PCT", "%").replace("PT3", "3PT").replace("REBOFF", "O-REB").replace("REBDEF", "D-REB")}</Table.HeaderCell>
                })
              }
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Current Season</Table.Cell>
              {
                _.map(['pts', 'rebOff', 'rebDef', 'ast', 'stl', 'blk', 'fgpct', 'ftpct', 'pt3pct', 'tov'], (label) => {
                  if (!seasonStats)
                    return <Table.Cell key={label + "-season"}></Table.Cell>
                  const avgVal = _.round(_.meanBy(seasonStats, label), 2)
                  return <Table.Cell key={label + "-season"}>{avgVal}</Table.Cell>
                })
              }
            </Table.Row>
            <Table.Row>
              <Table.Cell>Last 5 Games</Table.Cell>
              {
                _.map(['pts', 'rebOff', 'rebDef', 'ast', 'stl', 'blk', 'fgpct', 'ftpct', 'pt3pct', 'tov'], (label) => {
                  if (!last5Stats)
                    return <Table.Cell key={label + "-last5"}></Table.Cell>
                  const avgVal = _.round(_.meanBy(last5Stats, label), 2)
                  return <Table.Cell key={label + "-last5"}>{avgVal}</Table.Cell>
                })
              }
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    )
  }
}

export default PlayerStats