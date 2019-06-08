import React, { Component } from 'react'
import { deletePair } from '../actions/userActions'
import '../styles/styles.css'
import '../styles/userManagement.css'

class UsersRow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorText: '',
      displayMessages: true
    }
  }

  _deletePairConfirm (user1, user2) {

  }

  _deletePair (user1, user2) {
    //this.setState({displayMessages: true})
    console.log(user1)
    console.log(user2)

    if (user1 === '' || user2 === '') {
      console.log('errorText: Please select two users')
      this.setState({errorText: 'Please select two users'})
    } else if (user1 === user2) {
      console.log('errorText: The two users cannot be the same person')
      this.setState({errorText: 'The two users cannot be the same person'})
    } else {
      console.log("tryna")
      deletePair(user1, user2)
    }
  }

  render () {
    return (
      <div className="box">
        <div className='users-container'>
          <div className='user-names'>
            <div className={'user-container-paired'}>
              <div className='user-name'>
                {this.props.firstName} {this.props.lastName}
                {this.props.pair_name && `Pair: ${this.props.pair_name}`}
              </div>
            </div>
            <div className={'user-container-paired user-bottom'}>
              <div className='user-name'>
                {this.props.pairFirstName} {this.props.pairLastName}
                {this.props.pair_name && `Pair: ${this.props.pair_name}`}
              </div>
            </div>
          </div>
          <div className='pairInfo'>
            <div className='anti'>
              <text className="bolded count-text">Count: </text>
              <text className='count-text'>{this.props.count}</text>
            </div><br/>
            <div className='recent-text'>
              <text className="bolded">Most Recent: </text><text>{this.props.timestamp}</text>
            </div>
          </div>
          <button
            onClick={this._deletePair.bind(this, this.props.userKey, this.props.pairKey)}
            className='delete-pair'>
          </button>
        </div>
        <p className="spacer">{}</p>
      </div>
    )
  }
}

class UserRow extends Component {
  render () {
    return (
      <div className={'user-container-unpaired'}>
        <div className='user-name'>
          {this.props.firstName} {this.props.lastName}
          {this.props.pair_name && `Pair: ${this.props.pair_name}`}
        </div>
      </div>
    )
  }
}

module.exports = {UsersRow, UserRow}
