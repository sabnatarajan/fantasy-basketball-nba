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

  totals() {
    if (this.props.checked == false) {
      return null
    }

    if (!this.state.data) {
      return null
    }

    let totMPG = _.sumBy(this.state.data, function (obj) { return obj.avMPG })
    let totDefSc = _.sumBy(this.state.data, function (obj) { return obj.avDefScPG })
    let totOffSc = _.sumBy(this.state.data, function (obj) { return obj.avOffScPG })
    let totCostPerDefSc = _.sumBy(this.state.data, function (obj) { return obj.avCostPerDefSc })
    let totCostPerOffSc = _.sumBy(this.state.data, function (obj) { return obj.avCostPerOffSc })
    let totExplosiveness = _.sumBy(this.state.data, function (obj) { return obj.explosiveness })
    let totScPG = _.sumBy(this.state.data, function (obj) { return obj.avScPG })
    let totGamesNextWeek = _.sumBy(this.state.data, function (obj) { return obj.gamesNextWeek })
    let totProjectedSc = _.sumBy(this.state.data, function (obj) { return obj.projectedSc })

    return (
      <Table.Row style={{ fontWeight: '700' }}>
        <Table.Cell></Table.Cell>
        <Table.Cell>TOTALS</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>{totMPG}</Table.Cell>
        <Table.Cell>{totDefSc}</Table.Cell>
        <Table.Cell>{totOffSc}</Table.Cell>
        <Table.Cell>{totCostPerDefSc}</Table.Cell>
        <Table.Cell>{totCostPerOffSc}</Table.Cell>
        <Table.Cell>{totExplosiveness}</Table.Cell>
        <Table.Cell>{totScPG}</Table.Cell>
        <Table.Cell>{totGamesNextWeek}</Table.Cell>
        <Table.Cell>{totProjectedSc}</Table.Cell>
      </Table.Row>
    )
  }

  averages() {
    if (this.props.checked == false) {
      return null
    }

    if (!this.state.data) {
      return null
    }

    let avgMPG = this.state.data ? 0 : _.round(_.meanBy(this.state.data, function (obj) { return obj.avMPG }), 2)
    let avgDefSc = this.state.data ? 0 : _.round(_.meanBy(this.state.data, function (obj) { return obj.avDefScPG }), 2)
    let avgOffSc = this.state.data ? 0 : _.round(_.meanBy(this.state.data, function (obj) { return obj.avOffScPG }), 2)
    let avgCostPerDefSc = this.state.data ? 0 : _.round(_.meanBy(this.state.data, function (obj) { return obj.avCostPerDefSc }), 2)
    let avgCostPerOffSc = this.state.data ? 0 : _.round(_.meanBy(this.state.data, function (obj) { return obj.avCostPerOffSc }), 2)
    let avgExplosiveness = this.state.data ? 0 : _.round(_.meanBy(this.state.data, function (obj) { return obj.explosiveness }), 2)
    let avgScPG = this.state.data ? 0 : _.round(_.meanBy(this.state.data, function (obj) { return obj.avScPG }), 2)
    let avgGamesNextWeek = this.state.data ? 0 : _.round(_.meanBy(this.state.data, function (obj) { return obj.gamesNextWeek }), 2)
    let avgProjectedSc = this.state.data ? 0 : _.round(_.meanBy(this.state.data, function (obj) { return obj.projectedSc }), 2)

    return (
      <Table.Row style={{ fontWeight: '700' }}>
        <Table.Cell></Table.Cell>
        <Table.Cell>AVERAGES</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>{avgMPG}</Table.Cell>
        <Table.Cell>{avgDefSc}</Table.Cell>
        <Table.Cell>{avgOffSc}</Table.Cell>
        <Table.Cell>{avgCostPerDefSc}</Table.Cell>
        <Table.Cell>{avgCostPerOffSc}</Table.Cell>
        <Table.Cell>{avgExplosiveness}</Table.Cell>
        <Table.Cell>{avgScPG}</Table.Cell>
        <Table.Cell>{avgGamesNextWeek}</Table.Cell>
        <Table.Cell>{avgProjectedSc}</Table.Cell>
      </Table.Row>
    )
  }

  paginator() {
    // TODO
    return null
    if (!this.state.data || this.props.checked) {
      return null
    }
    let numPages = Math.max(1, Math.ceil(this.state.data.length / this.props.paginateEntries))
    let pages = Array.from(new Array(numPages), (val, index) => index + 1)
    return (
      <div>
        <Button.Group floated='right'>
          {_.map(pages, ({i}) => { <Button>{i}</Button> })}
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Button.Group>
      </div>
    )
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
            {_.map(data, ({ playerID, name, position, team, starter, avMPG, avDefScPG, avOffScPG, avCostPerDefSc, avCostPerOffSc, explosiveness,
              avScPG, gamesNextWeek, projectedSc }) => (
                <Table.Row key={playerID}>
                  <Table.Cell><Checkbox label="" checked={this.props.checked} onChange={this.handleToggle.bind(this, playerID)} /></Table.Cell>
                  <Table.Cell textAlign='left'><Link to={'/player/' + playerID}>{name}</Link></Table.Cell>
                  <Table.Cell>{position}</Table.Cell>
                  <Table.Cell>{team}</Table.Cell>
                  <Table.Cell>{starter}</Table.Cell>
                  <Table.Cell>{avMPG}</Table.Cell>
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
            {this.totals()}
            {this.averages()}
          </Table.Body>
        </Table>
        {this.paginator()}
      </div>
    )
  }

}

export default PlayerGrid