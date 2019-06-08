import React, { Component } from 'react'
import '../styles/styles.css'
import DisplayPairs from './DisplayPairs'

class UserManagement extends Component {
  constructor (props) {
    super(props)
    this.deletePair = this.props.deletePair;
    this.state = {
      users: {
        soloReflectionUsers: {},
        pairedReflectionUsers: {},
        totalCount: 0,
        soloReflectionCount: 0,
        pairedReflectionCount: 0,
        threads: {},
        lastMsgs: {}
      },
    }

    this._sortUsers = this._sortUsers.bind(this)
  }

  async componentDidMount () {
    await this.props.fetchUsers()
    await this.props.fetchMessages()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.userInfo.users) {
        this._sortUsers(nextProps.userInfo.users)
      }
      if (nextProps.messageInfo.messages) {
        this._sortMessages(nextProps.messageInfo.messages)
      }
    }
  }

  _sortUsers (users) {
    var userObj = {
      soloReflectionUsers: {},
      pairedReflectionUsers: {},
      totalCount: 0,
      soloReflectionCount: 0,
      pairedReflectionCount: 0,
      threads: {},
      lastMsgs: {}
    }

    for (var user_id in users) {
      if (users[user_id].reflectionType === 'paired') {
        userObj.pairedReflectionUsers[user_id] = users[user_id]
      } else {
        userObj.soloReflectionUsers[user_id] = users[user_id]
      }
    }

    userObj.pairedReflectionCount = Object.keys(userObj.pairedReflectionUsers).length
    userObj.soloReflectionCount = Object.keys(userObj.soloReflectionUsers).length
    userObj.totalCount = userObj.pairedReflectionCount + userObj.soloReflectionCount

    this.setState({users: userObj})
  }

  _sortMessages(messages) {
    var threadsObj = {}
    var msgsObj = {}
    for (var threadId in messages) {
      var thread = messages[threadId]
      var count = 0
      var latest = 0
      for (var messageId in thread) {
        var message = thread[messageId]
        if (message.senderId !== "prompt") {
          var timestamp = message.timestamp
          if (timestamp > latest) {
            latest = timestamp
          }
          count++
        }
      }
      threadsObj[threadId] = count
      msgsObj[threadId] = latest
    }
    var usersObj = this.state.users;
    usersObj.threads = threadsObj
    usersObj.lastMsgs = msgsObj
    this.setState({users: usersObj})
  }

  render () {
    return (
      <div>
        <DisplayPairs users={this.state.users}/>
      </div>
    )
  }
}

export default UserManagement
