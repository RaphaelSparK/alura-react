import React, { Component } from 'react'

class ButtonSubmit extends Component {
  render () {
    return (
      <div className="pure-control-group">
        <button type="submit" className="pure-button pure-button-primary">{this.props.title}</button>
      </div>
    )
  }
}

export default ButtonSubmit
