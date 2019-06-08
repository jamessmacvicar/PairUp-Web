import React, { Component } from 'react'
import '../styles/styles.css'

class NewUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displayMessages: true,
      emailAddress: '',
      firstName: '',
      lastName: '',
      reflectionType: 'solo',
    }

    this._handleChange = this._handleChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleChange(e) {
    this.setState({displayMessages: false})
    var obj = {}
    obj[e.target.name] = e.target.value
    this.setState(obj)
  }

  _handleSubmit(e) {
    e.preventDefault()
    this.setState({displayMessages: true})
    this.props.createUser(this.state.firstName, this.state.lastName, this.state.emailAddress, this.state.reflectionType)
    this.setState({
      displayMessages: true,
      emailAddress: '',
      firstName: '',
      lastName: '',
      reflectionType: 'solo',
    })
  }

  render () {
    return (
      <div>
        <p>By default, all new users are created with the password 'pairachute'. They will be prompted to change their password in the app.</p>
        { this.state.displayMessages && <span style={{color: 'green'}}>{this.props.createUserInfo.successMessage}</span> }
        { this.state.displayMessages && <span style={{color: 'red'}}>{this.props.createUserInfo.errorMessage}</span> }
        <form onSubmit={this._handleSubmit}>
          <div>
            First Name:
            <input type='text' value={this.state.firstName} name='firstName' onChange={this._handleChange}/>
          </div>
          <div>
            Last Name:
            <input type='text' value={this.state.lastName} name='lastName' onChange={this._handleChange}/>
          </div>
          <div>
            Email Address:
            <input type='text' value={this.state.emailAddress} name='emailAddress' onChange={this._handleChange}/>
          </div>
          <div>
            Reflection Type:
            <select value={this.state.reflectionType} name='reflectionType' onChange={this._handleChange} className="dropdown">
              <option name='reflectionType' value='solo'>Solo</option>
              <option name='reflectionType' value='paired'>Paired</option>
            </select>
          </div>
          <input type='submit' value='Submit'  className='button'/>
        </form>
      </div>
    )
  }
}

export default NewUser
