import React, { Component } from 'react'
import '../styles/styles.css'
import '../styles/viewMessages.css'

class MessageRow extends Component {
  render () {
    var timestamp = (new Date(this.props.timestamp)).toString();
    var day = timestamp.slice(0,3);
    var date = timestamp.slice(4,10);
    var yearTime = timestamp.slice(11,21);
    var timezone = timestamp.slice(35,38);
    var timestampStr = day + ", " + date + ", " + yearTime + " " + timezone;
    return (
      <div className="message-container">
        <p className="message-content">"{this.props.message}"</p>
        <div className="message-info-container">
          <div className="message-info">
            <text className="bolded">Sender: </text><text>{this.props.sender}</text><br/>
            <text className="bolded">Timestamp: </text><text>{timestampStr}</text>
          </div>
        </div>
      </div>
    )
  }
}

export default MessageRow
