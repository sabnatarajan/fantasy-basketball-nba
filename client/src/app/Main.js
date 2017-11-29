import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import HomeLayout from './HomeLayout'
import PlayerLayout from './PlayerLayout'
import Err404Layout from './Err404Layout'
import PlayerCompareLayout from './PlayerCompareLayout';
import TeamBuilderLayout from './TeamBuilderLayout'
import WeightsLayout from './WeightsLayout'

class Main extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      weights: null
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomeLayout} />
          <Route path="/player/:playerID" component={PlayerLayout} />
          <Route path="/player_compare/:player1ID/:player2ID" component={PlayerCompareLayout} />
          <Route path="/team_builder/" component={TeamBuilderLayout} />
          <Route path="/weights/" component={WeightsLayout} />
          <Route component={Err404Layout} />
        </Switch>
      </Router>
    );
  }
}

export default Main;
