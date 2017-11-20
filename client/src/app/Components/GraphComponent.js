import React from 'react'

class Graph extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    let _id = this.props._id;    
    Plotly.newPlot(_id, [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16]
    }], {
        margin: {
          t: 0, r: 10, l: 30, b: 40
        }
      });
  }

  render() {
    return (
      <div id={this.props._id} className="plot"> </div>
    )
  }
}

export default Graph