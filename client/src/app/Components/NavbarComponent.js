import React from 'react'

class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">{this.props.title}</a>
          <form>
            <div className="right input-field">
              <input id="search" type="search" required />
              <label className="center label-icon" htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
    )
  }
}

export default Navbar;