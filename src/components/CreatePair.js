import React, { Component } from 'react'
import '../styles/styles.css'

class CreatePair extends Component {
  constructor (props) {
    super(props)
    this.state = {
      soloReflectionUsers: {},
      pairedReflectionUsers: {},
      solo1: '',
      solo2: '',
      pair1: '',
      pair2: '',
      errorText: '',
      displayMessages: true
    }

    this._handleChange = this._handleChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._sortUsers = this._sortUsers.bind(this)
    this._renderOptions = this._renderOptions.bind(this)
  }

  async componentDidMount () {
    await this.props.fetchUsers()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.userInfo.users) {
        this._sortUsers(nextProps.userInfo.users)
      }
    }
  }

  _handleChange (e) {
    this.setState({errorText: ''})
    this.setState({displayMessages: false})
    var obj = {}
    obj[e.target.name] = e.target.value
    this.setState(obj)
  }

  _handleSubmit (e) {
    this.setState({displayMessages: true})
    e.preventDefault()
    let user1
    let user2
    if (e.target.name === 'paired') {
      user1 = this.state.pair1
      user2 = this.state.pair2
    } else {
      user1 = this.state.solo1
      user2 = this.state.solo2
    }

    if (user1 === '' || user2 === '') {
      this.setState({errorText: 'Please select two users'})
    } else if (user1 === user2) {
      this.setState({errorText: 'The two users cannot be the same person'})
    } else {
      this.props.createPair(user1, user2, e.target.name)
    }
  }

  _sortUsers (users) {
    var userObj = {
      soloReflectionUsers: {},
      pairedReflectionUsers: {},
    }

    for (var user_id in users) {
      if (users[user_id].reflectionType === 'paired') {
        if (!users[user_id].isPaired) {
          userObj.pairedReflectionUsers[user_id] = users[user_id]
        }
      } else {
        if (!users[user_id].isPaired) {
          userObj.soloReflectionUsers[user_id] = users[user_id]
        }
      }
    }
    this.setState(userObj)
  }

  _renderOptions (reflectionType, name) {
    var users = reflectionType === 'paired'
      ? this.state.pairedReflectionUsers
      : this.state.soloReflectionUsers

    return Object.entries(users).map((item) =>
      (<option key={item[0]} name={name} value={item[0]}>{item[1].firstName} {item[1].lastName}</option>)
    )
  }

  render () {
    return (
      <div>
        { this.state.displayMessages &&
          <div>
            <p style={{color: 'red'}}>{this.state.errorText}</p>
            <p style={{color: 'red'}}>{this.props.createPairInfo.errorMessage}</p>
            <p style={{color: 'green'}}>{this.props.createPairInfo.successMessage}</p>
          </div>
        }
        <div>
          <h3>Paired Reflection Type</h3>
          <p>Create a new <strong>paired reflection type</strong> pair. This pair will chat and reflect together in the same thread.</p>
          <div className="flex-row" style={{justifyContent: 'center'}}>
            <form name='paired' onSubmit={this._handleSubmit}>
              <select onChange={this._handleChange} name='pair1' className="dropdown">
                <option selected name='pair1' value=''></option>
                {this._renderOptions('paired', 'pair1')}
              </select>
              <select onChange={this._handleChange} name='pair2' className="dropdown">
                <option selected name='pair2' value=''></option>
                {this._renderOptions('paired', 'pair2')}
              </select>
              <input type='submit' value='Create New Pair' className='button'/>
            </form>
          </div>
        </div>
        <div style={{ marginTop: '100px' }}>
          <h3>Solo Reflection Type</h3>
          <p>Create a new <strong>solo reflection type</strong> pair. This pair will be able to chat together but will reflect on prompts separately.</p>
          <div className="flex-row" style={{justifyContent: 'center'}}>
            <form name='solo' onSubmit={this._handleSubmit}>
              <select onChange={this._handleChange} name='solo1' className="dropdown">
                <option selected name='solo1' value=''></option>
                {this._renderOptions('solo', 'solo1')}
              </select>
              <select onChange={this._handleChange} name='solo2' className="dropdown">
                <option selected name='solo2' value=''></option>
                {this._renderOptions('solo', 'solo2')}
              </select>
              <input type='submit' value='Create New Pair' className='button'/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default CreatePair
