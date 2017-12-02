import React from 'react'
import CategoryStat from './CategoryStat'

class PlayerStatsByCategory extends React.Component {
  constructor(props, context) {
    super(props)
  }

  render() {
    return (
      <ul className="collapsible" data-collapsible="expandable">
        <CategoryStat category="PTS" projected={90} />
      </ul>
    )
  }
}

export default PlayerStatsByCategory