import React from 'react'

class Err404Layout extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <h1 style={{ marginTop: '30vh', marginLeft: '20px', marginRight: '20px' }} className="center-align white-text">Oops! Nothing here!</h1>
    )
  }
}

export default Err404Layout