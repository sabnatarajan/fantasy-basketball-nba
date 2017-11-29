import React, { ParamHTMLAttributes } from 'react'
import _ from 'lodash'
import { Button, Checkbox, Popup, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class PlayerGrid extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.tableData = this.props.data
  }

  state = {
    column: null,
    data: this.props.data,
    direction: null,
    filterPosition: null
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    })
  }

  handleToggle(playerID, e, data) {
    let addPlayer = data.checked
    this.props.updateTeamCallback(playerID, addPlayer)
  }

  render() {
    const { column, data, direction, filterPosition } = this.state

    return (
      <div>
        <Table sortable celled singleLine compact size='small' textAlign='center'>
          <Table.Header>
            <Table.Row>
              <Popup trigger={<Table.HeaderCell></Table.HeaderCell>} content='Click to select player' />
              <Popup trigger={<Table.HeaderCell sorted={column === 'name' ? direction : null} onClick={this.handleSort('name')}>
                Name
            </Table.HeaderCell>} content="Name" />
              <Popup trigger={<Table.HeaderCell sorted={column === 'position' ? direction : null} onClick={this.handleSort('position')}>
                Pos
            </Table.HeaderCell>} content="Position" />
              <Popup trigger={<Table.HeaderCell sorted={column === 'team' ? direction : null} onClick={this.handleSort('team')}>
                Team
            </Table.HeaderCell>} content='Team' />
              <Popup trigger={<Table.HeaderCell sorted={column === 'starter' ? direction : null} onClick={this.handleSort('starter')}>
                Start %
            </Table.HeaderCell>} content='% games started' />
              <Popup trigger={<Table.HeaderCell sorted={column === 'avMPG' ? direction : null} onClick={this.handleSort('avMPG')}>
                MPG
            </Table.HeaderCell>} content='Average minutes per game' />
              <Popup trigger={<Table.HeaderCell sorted={column === 'avDefSc' ? direction : null} onClick={this.handleSort('avDefSc')}>
                DefSc
            </Table.HeaderCell>} content='Average defensive fantasy score per game' />
              <Popup trigger={<Table.HeaderCell sorted={column === 'avOffSc' ? direction : null} onClick={this.handleSort('avOffSc')}>
                OffSc.
            </Table.HeaderCell>} content='Average offensive fantasy score per game' />
              <Popup trigger={<Table.HeaderCell sorted={column === 'avCostPerDefSc' ? direction : null} onClick={this.handleSort('avCostPerDefSc')}>
                $DefSc
            </Table.HeaderCell>} content='Average cost per defensive score' />
              <Popup trigger={<Table.HeaderCell sorted={column === 'avCostPerOffSc' ? direction : null} onClick={this.handleSort('avCostPerOffSc')}>
                $OffSc
            </Table.HeaderCell>} content='Average cost per offensive score' />
              <Popup trigger={<Table.HeaderCell sorted={column === 'explosiveness' ? direction : null} onClick={this.handleSort('explosiveness')}>
                XPL
            </Table.HeaderCell>} content='Explosiveness' />
              <Popup trigger={<Table.HeaderCell sorted={column === 'avScPG' ? direction : null} onClick={this.handleSort('avScPG')}>
                Score
            </Table.HeaderCell>} content='Average fantasy score per game' />
              <Popup trigger={<Table.HeaderCell sorted={column === 'gamesNextWeek' ? direction : null} onClick={this.handleSort('gamesNextWeek')}>
                #GNW
            </Table.HeaderCell>} content='Number of games next week' />
              <Popup trigger={<Table.HeaderCell sorted={column === 'projScNextWeek' ? direction : null} onClick={this.handleSort('projScNextWeek')}>
                Proj Sc.
            </Table.HeaderCell>} content='Projected fantasy score next week' />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ playerID, name, position, team, starter, avMinPlayedPG, avDefScPG, avOffScPG, avCostPerDefSc, avCostPerOffSc, explosiveness,
              avScPG, gamesNextWeek, projectedSc }) => (
                <Table.Row key={playerID}>
                  <Table.Cell><Checkbox label="" checked={this.props.checked} onChange={this.handleToggle.bind(this, playerID)} /></Table.Cell>
                  <Table.Cell textAlign='left'><Link to={'/player/' + playerID}>{name}</Link></Table.Cell>
                  <Table.Cell>{position}</Table.Cell>
                  <Table.Cell>{team}</Table.Cell>
                  <Table.Cell>{starter}</Table.Cell>
                  <Table.Cell>{avMinPlayedPG}</Table.Cell>
                  <Table.Cell>{avDefScPG}</Table.Cell>
                  <Table.Cell>{avOffScPG}</Table.Cell>
                  <Table.Cell>{avCostPerDefSc}</Table.Cell>
                  <Table.Cell>{avCostPerOffSc}</Table.Cell>
                  <Table.Cell>{explosiveness}</Table.Cell>
                  <Table.Cell>{avScPG}</Table.Cell>
                  <Table.Cell>{gamesNextWeek}</Table.Cell>
                  <Table.Cell>{projectedSc}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    )
  }

}

export default PlayerGrid