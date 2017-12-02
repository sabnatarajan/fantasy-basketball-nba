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
      weights: null,
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
          <Route exact path="/" component={HomeLayout} />
          <Route path="/player/:playerID" render={(props) => (<PlayerLayout playerID={props.match.params.playerID} />)} />
          <Route path="/team_builder/" render={(props) => (<TeamBuilderLayout {...this.state} />)} />
          <Route component={Err404Layout} />
        </Switch>
      </Router>
    );
  }
}

export default Main;
