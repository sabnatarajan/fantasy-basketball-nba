import React from 'react'
import Graph from './Graph'

class CategoryStat extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    let id_past_season = this.props.category + "_past"
    let id_curr_season = this.props.category + "_curr"
    return (
      <li>
        <div className="collapsible-header">{this.props.category} | {this.props.projected}</div>
        <div className="collapsible-body">
          <div className="row">
            <Graph id={id_past_season} />
            <Graph id={id_curr_season} />
          </div>
        </div>
      </li>
    )
  }
}

export default CategoryStat