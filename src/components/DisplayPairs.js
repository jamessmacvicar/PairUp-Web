import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import '../styles/styles.css'
import '../styles/userManagement.css'
import {UsersRow, UserRow} from './UserRow'

class DisplayPairs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pairings: [[],[],[],[]]
    }
  }

  componentWillReceiveProps () {
    var reflectionTypes = ['paired', 'solo'];
    var statuses = ['paired', 'unpaired'];
    var tempThreadId = 0;
    for (var rIndex=0; rIndex<reflectionTypes.length; rIndex++) {
      var reflectionType = reflectionTypes[rIndex];
      for (var sIndex=0; sIndex<statuses.length; sIndex++) {
        var status = statuses[sIndex];
        var result = [];
        var covered = [];
        var usersObj = reflectionType === 'paired'
          ? this.props.users.pairedReflectionUsers
          : this.props.users.soloReflectionUsers
        var users = Object.entries(usersObj);
        var threads = this.props.users.threads;
        var lastMsgs = this.props.users.lastMsgs;

        var isPaired = status === 'paired'
        for (var i=0; i<users.length; i++) {
          var userInfo = users[i];
          var userId = userInfo[0];
          var user = userInfo[1];

          if (user.isPaired === isPaired) {
            if (isPaired) {
              if (!covered.includes(userId)) {
                var threadId = reflectionType === 'paired'
                  ? user.threads.reflectionAndChat
                  : user.threads.chatOnly
                var pairUserId = user.pairId;
                var pairUser = usersObj[pairUserId];
                var threadCount = threads[threadId];

                var lastMsg = lastMsgs[threadId];
                if (lastMsg != 0) {
                  var timestamp = new Date(lastMsg);
                  timestamp = timestamp.toString().slice(4,15)
                } else {
                  var timestamp = "N/A";
                }

                covered.push(userId);
                covered.push(pairUserId);
                if (threadId == null) {
                  console.log(tempThreadId);
                  threadId = tempThreadId;
                  tempThreadId++;
                }
                result.push(
                  <div key={threadId}>
                    <UsersRow key={threadId} userKey={userId} pairKey={pairUserId}
                      count={threadCount} timestamp={timestamp}
                      firstName={user.firstName} lastName={user.lastName}
                      pairFirstName={pairUser.firstName} pairLastName={pairUser.lastName}
                    />
                    <p className="spacer">{}</p>
                  </div>
                );
              }
            } else {
              result.push(<UserRow key={userId} firstName={user.firstName} lastName={user.lastName}/>);
            }
          }
        }

        var pairings = this.state.pairings;
        pairings[2*rIndex + sIndex] = result;
        this.setState({pairings: pairings});
      }
    }
  }

  render () {
    return (
      <div>
        <div>
          <img src={require('../assets/rightpoint_logo.png')} alt="Rightpoint" className="company-logo"/>
          <h3 className="users-header">{this.props.users.totalCount} Members</h3>
        </div>
        <h3>Paired Reflection Type ({this.props.users.pairedReflectionCount})</h3>
        <div className="flex-row">
          <div className="user-column">
            <h4 className='listGroup'>Paired Users</h4>
            <ListGroup >
              {this.state.pairings[0]}
            </ListGroup>
          </div>
          <div className="user-column">
            <h4 className='listGroup'>Unpaired Users</h4>
            <ListGroup >
              {this.state.pairings[1]}
            </ListGroup>
          </div>
        </div>

        <h3>Solo Reflection Type ({this.props.users.soloReflectionCount})</h3>
        <div className="flex-row">
          <div className="user-column">
            <h4 className='listGroup'>Paired Users</h4>
            <ListGroup >
              {this.state.pairings[2]}
            </ListGroup>
          </div>
          <div className="user-column">
            <h4 className='listGroup'>Unpaired Users</h4>
            <ListGroup >
              {this.state.pairings[3]}
            </ListGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default DisplayPairs
