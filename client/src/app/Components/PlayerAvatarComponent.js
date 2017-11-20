import React from 'react';

class PlayerAvatar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <img src={this.props.url} />
    );
  }
}

export default PlayerAvatar;