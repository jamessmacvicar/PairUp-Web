import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import Thread from './Thread'
import '../styles/styles.css'

class DisplayMessages extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      count: Object.entries(this.props.messageCount)
    }
  }

  componentWillMount () {
    var threads = this.props.threads
    var count = this.props.messageCount
    var result = []
    for (var threadId in threads) {
        result.push(<Thread
          key={threadId}
          threadId={threadId}
          users={threads[threadId].users}
          messages={threads[threadId].messages}
        />)
    }
    this.setState({count: count});
    this.setState({messages: result});
    console.log("DONE.")
  }

  shouldFilter(senderId, message) {
    var excludedSenders =["prompt", "promptResponse"]
    var excludedMessages = ["", "test", "Test", "testing", "Testing"]
    return !excludedSenders.includes(senderId)
        && !excludedMessages.includes(message)
  }

  render () {
    return (
      <div>
        <h3>Messages ({this.state.count})</h3>
        <div>
          <div className="user-column">
            <ListGroup>
              {this.state.messages}
            </ListGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default DisplayMessages
