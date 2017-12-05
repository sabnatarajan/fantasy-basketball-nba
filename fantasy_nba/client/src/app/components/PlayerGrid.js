import React, { ParamHTMLAttributes } from 'react'
import _ from 'lodash'
import { Button, Checkbox, Label, Popup, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class PlayerGrid extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
  state = {
    column: null,
    data: null,
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

  componentWillMount() {
    this.setState({
      data: this.props.data,
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
          {_.map(pages, ({ i }) => { <Button>{i}</Button> })}
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Button.Group>
      </div>
    )
  }

  getTableRow(colID, colHeader, colTooltip) {
    const { column, direction } = this.state
    return (
      <Popup trigger={
        <Table.HeaderCell sorted={column === colID ? direction : null} onClick={this.handleSort(colID)}>
          {colHeader}
        </Table.HeaderCell>}
        content={colTooltip} />
    )
  }

  getDefFPts(avREBDef, avBLK, avSTL) {
    return 0
  }

  getOffFPts(avPTS, avFTA, avFTM, avFGA, avFGM, avPT3M, avTOV, avAST, avREBOff) {
    return 0
  }

  getProjSc() {
    return 0
  }

  render() {
    const { column, data, direction, filterPosition } = this.state

    if (!data || data.length == 0) { // Do not display an empty team table
      if (this.props.checked) // Only apply to the master player list, not team list
        return <Label color="red" >You haven't chosen any players yet</Label>
    }

    return (
      <div>
        <Table sortable celled compact size='small' textAlign='center'>
          <Table.Header>
            <Table.Row>
              <Popup trigger={<Table.HeaderCell></Table.HeaderCell>} content='Click to select player' />
              {this.getTableRow('name', 'Name', 'Name')}
              {this.getTableRow('position', 'POS', 'Position')}
              {this.getTableRow('currTeamID', 'Team', 'Team')}
              {this.getTableRow('cost', 'Cost ($)', 'Fantasy League Cost')}
              {this.getTableRow('avFPtsPer$', 'FPts PG/$', 'Average Fantasy Pts. per $')}
              {this.getTableRow('avDefFPtsPer$', 'Def FPts PG/$', 'Average Defensive Fantasy Pts. per $')}
              {this.getTableRow('avOffFPtsPer$', 'Off FPts PG/$', 'Average Offensive Fantasy Pts. per $')}
              {this.getTableRow('projFPts', 'Proj FPts', 'Projected Fantasy Points for Next Week')}
              {this.getTableRow('gNxtWk', 'Games NW', '# Games next week')}
              {this.getTableRow('avFPts', 'FPts', 'Average Fantasy Points per Game')}
              {this.getTableRow('avDefFPts', 'Def FPts', 'Average Defensive Fantasy Points per Game')}
              {this.getTableRow('avOffFPts', 'Off FPts', 'Average Offensive Fantasy Points per Game')}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, (
              { playerID, name, position, currTeamID, costYAH, costESPN,
                avPTS, avREBOff, avREBDef, avREBTot, avFGA, avFGM, avSTL,
                avBLK, avAST, avTOV, avFTA, avFTM, avPT3A, avPT3M, gPlayed,
                gamesNxtWk, avSecsPlayed, probPlay }, idx) => {

              const weights = this.props.weights
              let avDefFPts = _.round(weights.REBTot * avREBDef + weights.BLK * avBLK + weights.STL * avSTL, 2)
              let avOffFPts = _.round(
                weights.PTS * avPTS
                + weights.REBTot * avREBOff
                + weights.STL * avAST
                + weights.TOV * avTOV
                + weights.PT3M * avPT3M
                + weights.FTA * avFTA
                + weights.FTM * avFTM
                + weights.FGA * avFGA
                + weights.FGM * avFGM, 2)

              let avFPts = _.round(
                weights.PTS * avPTS
                + weights.REBTot * avREBOff
                + weights.STL * avAST
                + weights.TOV * avTOV
                + weights.PT3M * avPT3M
                + weights.FTA * avFTA
                + weights.FTM * avFTM
                + weights.FGA * avFGA
                + weights.FGM * avFGM
                + weights.REBTot * avREBDef
                + weights.BLK * avBLK
                + weights.STL * avSTL, 2)

              let projFPts = Math.round(gamesNxtWk * probPlay * avFPts)

              let cost = costYAH
              let avFPtsPer$ = cost == 0 ? "-" : _.round(avFPts / cost, 2)
              let avDefFPtsPer$ = cost == 0 ? "-" : _.round(avDefFPts / cost, 2)
              let avOffFPtsPer$ = cost == 0 ? "-" : _.round(avOffFPts / cost, 2)
              let avMPG = Math.floor(avSecsPlayed / 60) + ":" + Math.floor(avSecsPlayed % 60)

              this.state.data[idx].avFPts = avFPts
              this.state.data[idx].avDefFPts = avDefFPts
              this.state.data[idx].avOffFPts = avOffFPts
              this.state.data[idx].avFPtsPer$ = avFPtsPer$
              this.state.data[idx].avDefFPtsPer$ = avDefFPtsPer$
              this.state.data[idx].avOffFPtsPer$ = avOffFPtsPer$
              this.state.data[idx].projFPts = projFPts
              this.state.data[idx].cost = cost

              return (
                <Table.Row key={playerID}>
                  <Table.Cell><Checkbox label="" checked={this.props.checked} onChange={this.handleToggle.bind(this, playerID)} /></Table.Cell>
                  <Table.Cell textAlign='left'><Link to={'/player/' + playerID}>{name}</Link></Table.Cell>
                  <Table.Cell>{position}</Table.Cell>
                  <Table.Cell>{currTeamID}</Table.Cell>
                  <Table.Cell>{cost == 0 ? "Not Drafted" : cost}</Table.Cell>
                  <Table.Cell>{avFPtsPer$}</Table.Cell>
                  <Table.Cell>{avDefFPtsPer$}</Table.Cell>
                  <Table.Cell>{avOffFPtsPer$}</Table.Cell>
                  <Table.Cell>{projFPts}</Table.Cell>
                  <Table.Cell>{gamesNxtWk}</Table.Cell>
                  <Table.Cell>{avFPts}</Table.Cell>
                  <Table.Cell>{avDefFPts}</Table.Cell>
                  <Table.Cell>{avOffFPts}</Table.Cell>
                </Table.Row>
              )
            }
            )}
          </Table.Body>
        </Table>
        {this.paginator()}
      </div>
    )
  }

}

export default PlayerGrid