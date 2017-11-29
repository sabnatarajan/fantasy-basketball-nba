import React from 'react'
import { Link } from 'react-router-dom'

class PlayerBio extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  playerDetails() {
    // TODO: Write code to fetch this information from the server using playerID
    return (
      <div>
        Team: {this.props.team} <br />
        Nicknames: {this.props.nicknames} <br />
        Position(s): {this.props.positions} <br />
        Height, Weight: {this.props.height}, {this.props.weight} <br />
        Position(s): {this.props.positions} <br />
      </div>
    )
  }

  playerSummary() {
    return (
      <div className="col s12 m5">
        <div className="card">
          <div className="card-content">
            <span className="card-title">Summary</span>
            <table>
              <thead>
                <tr>
                  <th>G</th>
                  <th>PTS</th>
                  <th>TRB</th>
                  <th>AST</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>16</td>
                  <td>28.9</td>
                  <td>7.8</td>
                  <td>8.6</td>
                </tr>
                <tr>
                  <td>1077</td>
                  <td>27.2</td>
                  <td>7.3</td>
                  <td>7.1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  render() {
    console.log(this.props.summary)
    return (
      <div id="player-bio" className="row">
        <div className={this.props.summary ? "col s12 m12" : "col s12 m7"}>
          <div className="card horizontal">
            <div className="card-image">
              <img src="/jamesle01.jpg" />
            </div>
            <div className="card-stacked" >
              <div className="card-content">
                <span className="card-title"><strong><Link to="/player/${this.props.playerID}">{this.props.name}</Link></strong></span>
                {this.props.summary ? "" : this.playerDetails()}
              </div>
            </div>
          </div>
        </div>
        {this.props.summary ? "" : this.playerSummary()}
      </div>
    )
  }
}

export default PlayerBio;