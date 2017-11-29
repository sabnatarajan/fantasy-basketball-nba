import React from 'react'
import { Link } from 'react-router-dom'

class TopPlayers extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  getTopPlayers() {
    // Write code here to get the TOP PLAYERS from the server
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((playerID) =>
      <li key={playerID.toString()} className="collection-item"><Link to={'/player/' + playerID}>Alvin</Link></li>
    )
  }

  render() {
    let playerID = 'ale01'
    let topPlayers = this.getTopPlayers()
    return (
      <div>
        <h5 className="white-text">Top Players</h5>
        <ul className="collection">
          {topPlayers}
        </ul>
      </div>
    )
  }
}

export default TopPlayers