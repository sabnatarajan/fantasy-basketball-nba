import React from 'react'
import Navbar from './components/Navbar'
import PlayerBio from './components/PlayerBio'
import PlayerStats from './components/PlayerStats'

class PlayerCompareLayout extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        <Navbar title="Fantasy NBA" />
        <div className="row">
          <div className="col s6 m6">
            <PlayerBio name="LeBron James" summary={true} />
            <PlayerStats />
          </div>
          <div className="col s6 m6">
            <PlayerBio name="LeBron James" summary={true} />
            <PlayerStats />
          </div>
        </div>
      </div>
    )
  }
}

export default PlayerCompareLayout