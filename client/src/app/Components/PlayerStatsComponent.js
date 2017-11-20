import React from 'react'
import Graph from './GraphComponent';

class PlayerStats extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="row">
        <div className="col sm12 m12">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Player Stats</span>
              <table className="centered highlight bordered">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Past Seasons</th>
                    <th>Current Season</th>
                    <th>Projected next week</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>PTS</td>
                    <td><Graph _id="plot1" /></td>
                    <td><Graph _id="plot2" /></td>
                    <td>80</td>
                  </tr>
                  <tr>
                    <td>FT</td>
                    <td>Graph goes here</td>
                    <td>Graph goes here</td>
                    <td>12</td>
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

export default PlayerStats