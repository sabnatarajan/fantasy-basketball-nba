import React from 'react';
import Navbar from './components/Navbar';
import PlayerBio from './components/PlayerBio';
import PlayerStats from './components/PlayerStats'
import { Container } from 'semantic-ui-react'

class PlayerLayout extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Navbar title="Fantasy NBA" />
        <Container>
          <PlayerBio playerID={this.props.playerID} />
        </Container>
      </div>
    );
  }
}

export default PlayerLayout;