import React, { ParamHTMLAttributes } from 'react'
import _ from 'lodash'
import { Button, Checkbox, Icon, Label, Menu, Popup, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class PlayerGrid extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      column: null,
      data: null,
      direction: null,
      page: props.page
    }
  }

  setStateOnParent(nextState) {
    this.props.setStateCallback(nextState)
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state
    this.props.sortCallback(clickedColumn, direction)
  }

  // You don't need this function, but keep it for now anyway -- till fully tested
  // componentWillMount() {
  //   this.setState({
  //     data: this.props.data,
  //   })
  // }

  componentDidMount() {
    this.paginate(this.state.page, this.props.data)
  }

  componentWillUnmount() {
    // Remember which page you were on before leaving this page
    this.setStateOnParent({
      page: this.state.page
    })
  }

  componentWillReceiveProps(nextProps) {

    // If not receiving new data (navigate back to same page), then remember the last page you were on and go back to that page
    if (nextProps && this.props) {
      if (this.props.filteredPosition != nextProps.filteredPosition) {
        this.paginate(1, nextProps.data)
        this.setState({ page: 1 })
        return
      }
    }
    this.paginate(this.state.page, nextProps.data)
  }

  addOrRemovePlayer(playerID, e, data) {
    let addPlayer = data.checked
    this.props.updateTeamCallback(playerID, addPlayer)
  }

  getTableRow(colID, colHeader, colTooltip) {
    const { column, direction } = this.props
    return (
      <Popup trigger={
        <Table.HeaderCell key={colID} sorted={column === colID ? direction : null} onClick={this.handleSort(colID)}>
          {colHeader}
        </Table.HeaderCell>}
        content={colTooltip} />
    )
  }

  paginate = (pageNum) => {
    if (!this.props.data) {
      return
    }
    const { data, entriesPerPage } = this.props
    this.setState({
      page: pageNum,
      data: this.props.data.slice((pageNum - 1) * entriesPerPage, pageNum * entriesPerPage)
    })
  }

  render() {
    const { column, data, direction } = this.state

    if (!data || data.length == 0) { // Do not display an empty team table
      if (this.props.checked) // Only apply to the master player list, not team list
        return <Label color="red" >You haven't chosen any players yet</Label>
    }

    return (
      <div>
        <Table sortable compact celled size='small' textAlign='center'>
          <Table.Header>
            <Table.Row>
              <Popup trigger={<Table.HeaderCell></Table.HeaderCell>} content='Click to select player' />
              {this.getTableRow('name', 'Name', 'Name')}
              {this.getTableRow('position', 'POS', 'Position')}
              {this.getTableRow('currTeamID', 'Team', 'Team')}
              {this.getTableRow('zScores', 'Z-Score', 'Z-Score')}
              {this.getTableRow('cost', 'Cost ($)', 'Fantasy League Cost')}
              {this.getTableRow('avFPtsPer$', 'FPts PG/$', 'Average Fantasy Pts. per $')}
              {this.getTableRow('avDefFPtsPer$', 'Def FPts PG/$', 'Average Defensive Fantasy Pts. per $')}
              {this.getTableRow('avOffFPtsPer$', 'Off FPts PG/$', 'Average Offensive Fantasy Pts. per $')}
              {this.getTableRow('projFPts', 'Proj FPts', 'Projected Fantasy Points for Next Week')}
              {this.getTableRow('gamesNxtWk', 'Games NW', '# Games next week')}
              {this.getTableRow('avFPts', 'FPts', 'Average Fantasy Points per Game')}
              {this.getTableRow('avDefFPts', 'Def FPts', 'Average Defensive Fantasy Points per Game')}
              {this.getTableRow('avOffFPts', 'Off FPts', 'Average Offensive Fantasy Points per Game')}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, (
              { playerID, name, position, currTeamID, cost, avFPts, avFPtsPer$, avDefFPts, avDefFPtsPer$, avOffFPts, avOffFPtsPer$, projFPts, costYAH, costESPN,
                avPTS, avREBOff, avREBDef, avREBTot, avFGA, avFGM, avSTL,
                avBLK, avAST, avTOV, avFTA, avFTM, avPT3A, avPT3M, gPlayed,
                gamesNxtWk, avSecsPlayed, probPlay, zScores }, idx) => {

              const weights = this.props.weights

              avDefFPts =
                weights.REBTot * avREBDef
                + weights.BLK * avBLK
                + weights.STL * avSTL
              avDefFPts = _.round(avDefFPts, 2)

              avOffFPts =
                weights.PTS * avPTS
                + weights.REBTot * avREBOff
                + weights.AST * avAST
                + weights.TOV * avTOV
                + weights.PT3M * avPT3M
                + weights.FTA * avFTA
                + weights.FTM * avFTM
                + weights.FGA * avFGA
                + weights.FGM * avFGM
              avOffFPts = _.round(avOffFPts, 2)

              avFPts =
                weights.PTS * avPTS
                + weights.REBTot * avREBOff
                + weights.REBTot * avREBDef
                + weights.AST * avAST
                + weights.TOV * avTOV
                + weights.PT3M * avPT3M
                + weights.FTA * avFTA
                + weights.FTM * avFTM
                + weights.FGA * avFGA
                + weights.FGM * avFGM
                + weights.BLK * avBLK
                + weights.STL * avSTL
              avFPts = _.round(avFPts, 2)

              projFPts = Math.round(gamesNxtWk * probPlay * avFPts)

              avFPtsPer$ = cost == 0 ? 0 : _.round(avFPts / cost, 2)
              avDefFPtsPer$ = cost == 0 ? 0 : _.round(avDefFPts / cost, 2)
              avOffFPtsPer$ = cost == 0 ? 0 : _.round(avOffFPts / cost, 2)

              this.state.data[idx].avFPts = avFPts
              this.state.data[idx].avDefFPts = avDefFPts
              this.state.data[idx].avOffFPts = avOffFPts
              this.state.data[idx].avFPtsPer$ = avFPtsPer$
              this.state.data[idx].avDefFPtsPer$ = avDefFPtsPer$
              this.state.data[idx].avOffFPtsPer$ = avOffFPtsPer$
              this.state.data[idx].projFPts = projFPts
              this.state.data[idx].cost = cost

              return (
                <Table.Row key={name}>
                  <Table.Cell><Checkbox label="" checked={this.props.checked} onChange={this.addOrRemovePlayer.bind(this, playerID)} /></Table.Cell>
                  <Table.Cell textAlign='left'><Link to={'/player/' + playerID}>{name}</Link></Table.Cell>
                  <Table.Cell>{position}</Table.Cell>
                  <Table.Cell>{currTeamID}</Table.Cell>
                  <Table.Cell>{_.round(zScores, 2)}</Table.Cell>
                  <Table.Cell>{cost}</Table.Cell>
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
          {
            this.props.checked ? "" : (
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='14'>
                    <Menu floated='right' pagination>
                      {
                        _.map(
                          Array(Math.ceil(this.props.data.length / this.props.entriesPerPage)),
                          (v, i) => {
                            return <Menu.Item key={i} as='a' active={this.state.page == i + 1} onClick={this.paginate.bind(this, i + 1, this.props.data)} >{i + 1}</Menu.Item>
                          }
                        )
                      }
                    </Menu>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            )
          }
        </Table>
      </div >
    )
  }

}

export default PlayerGrid