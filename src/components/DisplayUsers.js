import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import '../styles/styles.css'
import UserRow from './UserRow'

class DisplayUsers extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }

    this._renderUsers = this._renderUsers.bind(this)
  }

  _renderUsers (status) {
    var users = []
    if (status === 'paired') {
      users = Object.entries(this.props.users.pairedReflectionUsers)
    } else if (status === 'solo') {
      users = Object.entries(this.props.users.soloReflectionUsers)
    }
    return users.map(item =>
      (<UserRow key={item[0]} firstName={item[1].firstName} lastName={item[1].lastName}/>)
    )
  }

  render () {
    return (
      <div>
        <h3>All Users ({this.props.users.totalCount})</h3>
        <div className="flex-row">
          <div className="user-column">
            <h3>Paired Reflection Users ({this.props.users.pairedReflectionCount})</h3>
            <ListGroup>
              {this._renderUsers('paired')}
            </ListGroup>
          </div>
          <div className="user-column">
            <h3>Solo Reflection Users ({this.props.users.soloReflectionCount})</h3>
            <ListGroup>
              {this._renderUsers('solo')}
            </ListGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default DisplayUsers
