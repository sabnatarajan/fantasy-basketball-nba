import React from 'react';
import Navbar from './components/Navbar';
import PlayerBio from './components/PlayerBio';
import PlayerStats from './components/PlayerStats'

class PlayerLayout extends React.Component {
  constructor(props, context) {
    super(props, context);
    console.log(props);
  }

  render() {
    return (
      <div>
        <Navbar title="Fantasy NBA" />
        <PlayerBio name="LeBron James" summary={false} />
        <PlayerStats />
      </div>
    );
  }
}

export default PlayerLayout;