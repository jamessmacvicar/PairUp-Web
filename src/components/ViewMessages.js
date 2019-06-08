import React, { Component } from 'react'
import '../styles/styles.css'
import '../styles/viewMessages.css'
import DisplayMessages from './DisplayMessages'

class ViewMessages extends Component {
  constructor (props) {
    super(props)
    this.state = {
      verified: false,
      value: '',
      displayMessages: false,
      errorText: '',
      threads: {},
      messageCount: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this._sortThreads = this._sortThreads.bind(this);
    this._sortMessages = this._sortMessages.bind(this);
    this._filterUsers = this._filterUsers.bind(this);
  }

  handleChange(event) {
    this.setState({displayMessages: false})
    this.setState({errorText: ''})
    this.setState({value: event.target.value})
  }

  handleClick() {
    if (this.state.value === "pairachute") {
      this.setState({verified: true})
    } else {
      this.setState({displayMessages: true})
      this.setState({errorText: 'Incorrect Password'})
    }
  }

  async componentDidMount () {
    await this.props.fetchThreads()
    await this.props.fetchMessages()
    await this.props.fetchUsers()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.threadInfo.threads) {
        this._sortThreads(nextProps.threadInfo.threads)
      }
      if (nextProps.messageInfo.messages) {
        this._sortMessages(nextProps.messageInfo.messages)
      }
      if (nextProps.userInfo.users) {
        this._filterUsers(nextProps.userInfo.users)
      }
    }
  }

  _sortThreads (threads) {
    var threadsObj = {}
    for (var threadId in threads) {
      threadsObj[threadId] = {
        messages: {},
        users: threads[threadId].users
      }
    }

    this.setState({threads: threadsObj})
  }

  _sortMessages (messages) {
    var threadsObj = this.state.threads
    var messageCount = 0;

    for (var threadId in messages) {
      var convo = messages[threadId]
      for (var msgId in convo){
        var thread = threadsObj[threadId]
        var msg = convo[msgId]
        var msgShort = null
        // Person
        if (msg.senderDisplayName) {
          msgShort = {
            message: msg.message,
            sender: msg.senderDisplayName,
            timestamp: msg.timestamp
          }
        }
        // Response
        else if (msg.responseInfo) {
          var sender = thread.users[msg.responseInfo.senderId]
          var message = msg.responseInfo.response.toString()
          msgShort = {
            message: message,
            sender: sender,
            timestamp: msg.timestamp
          }
        }
        // Remove prompts
        if (msgShort !== null) {
          messageCount = messageCount + 1
          threadsObj[threadId].messages[msgId] = msgShort
        }
      }
    }
    this.setState({threads: threadsObj})
    this.setState({messageCount: messageCount})
  }

  _filterUsers (users) {
    var usersObj = {
      users: {},
    }
    for (var userId in users) {
      usersObj[userId] = users[userId].displayName
    }
    this.setState({users: usersObj})
  }

  render () {
    if (this.state.verified) {
      return(<DisplayMessages threads={this.state.threads} messageCount={this.state.messageCount}/>)
    } else {
      return(
          <div className="password">
            <text>Enter Pasword:</text>
            <input type="text" name="password" value={this.state.value} onChange={this.handleChange} />
            <button onClick={this.handleClick} className='button'>Submit</button>
          </div>
      )
    }
  }
}

export default ViewMessages
