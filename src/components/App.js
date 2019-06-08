import React, { Component } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import '../styles/App.css'

import SendPromptContainer from './SendPromptContainer'
import UserManagementContainer from './UserManagementContainer'
import CreatePairContainer from './CreatePairContainer'
import NewUserContainer from './NewUserContainer'
import ViewMessagesContainer from './ViewMessagesContainer'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeKey: 1
    }
    this._handleSelect = this._handleSelect.bind(this)
    this._renderActiveContainer = this._renderActiveContainer.bind(this)
  }

  _handleSelect (eventKey) {
    // event.preventDefault()
    this.setState({activeKey: eventKey})
  }

  _renderActiveContainer () {
    switch (this.state.activeKey) {
      case 1:
        return (<SendPromptContainer />)
      case 2:
        return (<UserManagementContainer />)
      case 3:
        return (<CreatePairContainer />)
      case 4:
        return (<NewUserContainer />)
      case 5:
        return (<ViewMessagesContainer />)
      default:
        return null
    }
  }

  render () {
    return (
      <div>
        <div className='App-header'>
          <img src={require('../assets/pairachute_logo_title.png')} alt="Pairachute" className='logo'/>
        </div>
        <div className='App'>
          <Tabs activeKey={this.state.activeKey} onSelect={this._handleSelect} id="tabs" className="tabs">
            <Tab eventKey={1} title="Send New Prompt">Send New Prompt</Tab>
            <Tab eventKey={2} title="Manage Users">Manage Users</Tab>
            <Tab eventKey={3} title="Create New Pair">Create New Pair</Tab>
            <Tab eventKey={4} title="Create New User">Create New User</Tab>
            <Tab eventKey={5} title="View Messages">View Messages</Tab>
          </Tabs>
          {this._renderActiveContainer()}
        </div>
      </div>
    )
  }
}

export default App
