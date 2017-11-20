import React from 'react';
import Navbar from './Components/NavbarComponent';
import PlayerBio from './Components/PlayerBioComponent';
import PlayerStats from './Components/PlayerStatsComponent'

class Layout extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Navbar title="Fantasy NBA" />
        <PlayerBio name="LeBron James" />
        <PlayerStats />
      </div>
    );
  }
}

export default Layout;