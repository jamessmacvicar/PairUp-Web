import React, { Component } from 'react'
import '../styles/sendPrompt.css'

class SendPrompt extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // promptResponses: [],
      // promptResponseTexts: {},
      promptText: '',
      org: '',
    }

    // this._addAdditionalInputs = this._addAdditionalInputs.bind(this)
    this._handleChange = this._handleChange.bind(this)
    // this._handleAdditionalInputChange = this._handleAdditionalInputChange.bind(this)
    this._submitForm = this._submitForm.bind(this)
    this._storeInfo = this._storeInfo.bind(this)
  }

  // _addAdditionalInputs (event) {
  //   var newInput = `input${this.state.promptResponses.length}`
  //   this.setState({promptResponses: this.state.promptResponses.concat([newInput])})
  //
  //   const additionalTexts = this.state.promptResponseTexts
  //   additionalTexts[newInput] = ''
  //   this.setState({promptResponseTexts: additionalTexts})
  // }

  _handleChange (event) {
    this.setState({promptText: event.target.value})
    //this.setState({org: event.target.value})
  }

  _storeInfo (event) {
    this.setState({org: event.target.value})
  }

  // _handleAdditionalInputChange (event) {
  //   const additionalTexts = this.state.promptResponseTexts
  //   additionalTexts[event.target.name] = event.target.value
  //   this.setState({promptResponseTexts: additionalTexts})
  // }

  _submitForm (event) {
    // this.props.sendPrompt(this.state.promptText, this.state.promptResponseTexts)
    this.props.sendPrompt(this.state.promptText, this.state.org, this.state.org)
    event.preventDefault()
    this.setState({ promptText: '', org: '' })
  }

  render () {
    return (
      <div className="prompt-wrapper">
        <h3 className="prompt-header">Send a new prompt to selected organization pairs:</h3>
            <select value={this.state.org} name='org' onChange={this._storeInfo} className="dropdown">
              <option name='org' value=''></option>
              <option name='org' value='Pair Up'>Pair Up</option>
              <option name='org' value='Brave Initiatives'>Brave Initiatives</option>
              <option name='org' value='Brave Camp Immokalee 2019'>Brave Camp Immokalee 2019</option>
              <option name='org' value='Brave Camp Chicago June 2019'>Brave Camp Chicago June 2019</option>
              <option name='org' value='Brave Camp Chicago August 2019'>Brave Camp Chicago August 2019</option>
              <option name='org' value='Brave Camp Jakarta 2019'>Brave Camp Jakarta 2019</option>
              <option name='org' value='Brave Camp Indianapolis 2019'>Brave Camp Indianapolis 2019</option>
              <option name='org' value='Brave Camp Denver 2019'>Brave Camp Denver 2019</option>
              <option name='org' value='Brave Camp Santa Fe 2019'>Brave Camp Santa Fe 2019</option>
              <option name='org' value='Brave Camp Lancaster 2019'>Brave Camp Lancaster 2019</option>
            </select>
        <div className="prompt-input-container">
          <form onSubmit={this._submitForm}>
            <textarea value={this.state.promptText} className="prompt-input" name="prompt" rows="5" onChange={this._handleChange}></textarea>
            <input className="prompt-submit button" type="submit" value="Send" />
          </form>
        </div>
        

      </div>
    )
  }

  
}

export default SendPrompt

// <input className="add-prompt-response" type="button" value="+ Add response options" onClick={this._addAdditionalInputs} />
// {this.state.promptResponses.map(i => <input className="prompt-response" type="text" key={i} name={i} value={this.state.promptResponseTexts[i]} onChange={this._handleAdditionalInputChange} />)}
