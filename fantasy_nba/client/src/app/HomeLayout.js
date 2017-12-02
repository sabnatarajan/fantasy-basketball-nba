import React from 'react'
import Navbar from './components/Navbar'
import TopPlayers from './components/TopPlayers'

class HomeLayout extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        <Navbar title="Fantasy NBA" />
        <div id="search-players" className="row">
          <div className="col s12 m12">
            <div className="card">
              <div className="card-content">
                <h5 className="center-align">Start by searching for a player</h5>
                <div className="row">
                  <div className="input-field col s10">
                    <input type="text" id="autocomplete-input" className="autocomplete" />
                    <label htmlFor="autocomplete-input">Player Name</label>
                  </div>
                  <div className="input-field col s2">
                    <button className="btn-floating waves-effect waves-light" type="submit" name="action">
                      <i className="material-icons">search</i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Set weights */}
        <div id="league-weights" className="row">
          <div className="col s12 m12">
            <div className="card">
              <div className="card-content">
                <h5 className="center-align">Set weights for your league</h5>
                <div className="input-field">
                  <i className="material-icons prefix">search</i>
                  <input type="text" id="autocomplete-input" className="autocomplete" />
                  <label htmlFor="autocomplete-input">Player Name</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="top-players" className="row">
          <div className="col s12 m12">
            <TopPlayers />
          </div>
        </div>
      </div>
    )
  }
}

export default HomeLayout