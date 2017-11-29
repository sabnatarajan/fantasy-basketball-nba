import React from 'react'
import PlayerStatsByCategory from './PlayerStatsByCategory'

class PlayerStats extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div id="player-stats" className="row">
        <div className="col s12 m12">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Player Stats</span>
                <PlayerStatsByCategory />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PlayerStats