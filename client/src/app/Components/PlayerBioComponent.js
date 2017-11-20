import React from 'react'

class PlayerBio extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m7">
          <div className="card horizontal">
            <div className="card-image">
              <img src="../../jamesle01.jpg" />
            </div>
            <div className="card-stacked" >
              <div className="card-content">
                <span className="card-title"><strong>{this.props.name}</strong></span>
                Team: {this.props.team} <br />
                Nicknames: {this.props.nicknames} <br />
                Position(s): {this.props.positions} <br />
                Height, Weight: {this.props.height}, {this.props.weight} <br />
                Position(s): {this.props.positions} <br />
              </div>
            </div>
          </div>
        </div>
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
      </div>
    )
  }
}

export default PlayerBio;