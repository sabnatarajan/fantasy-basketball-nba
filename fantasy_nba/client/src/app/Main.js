import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import HomeLayout from './HomeLayout'
import PlayerLayout from './PlayerLayout'
import Err404Layout from './Err404Layout'
import PlayerCompareLayout from './PlayerCompareLayout';
import TeamBuilderLayout from './TeamBuilderLayout'
import WeightsLayout from './WeightsLayout'
import axios from 'axios'

class Main extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      weights: {
        PTS: 0.5,
        FGA: -0.45,
        FGM: 1,
        PT3M: 3,
        FTA: -0.75,
        FTM: 1,
        REBTot: 1.5,
        STL: 3,
        BLK: 3,
        AST: 2,
        TOV: -2,
      },
      league: null,
      team: null,
      players: null,
      setStateCallback: this.setStateFromChild
    }
  }

  setStateFromChild = (state_obj) => {
    this.setState({ ...state_obj })
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => (<HomeLayout {...this.state} />)} />
          <Route path="/player/:playerID" render={(props) => (<PlayerLayout playerID={props.match.params.playerID} />)} />
          <Route path="/team_builder/" render={(props) => (<TeamBuilderLayout {...this.state} />)} />
          <Route component={Err404Layout} />
        </Switch>
      </Router>
    );
  }
}

export default Main;
