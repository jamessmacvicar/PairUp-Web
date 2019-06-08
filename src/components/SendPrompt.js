import React, { Component } from 'react'
import '../styles/sendPrompt.css'

class SendPrompt extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // promptResponses: [],
      // promptResponseTexts: {},
      promptText: ''
    }

    // this._addAdditionalInputs = this._addAdditionalInputs.bind(this)
    this._handleChange = this._handleChange.bind(this)
    // this._handleAdditionalInputChange = this._handleAdditionalInputChange.bind(this)
    this._submitForm = this._submitForm.bind(this)
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
  }

  // _handleAdditionalInputChange (event) {
  //   const additionalTexts = this.state.promptResponseTexts
  //   additionalTexts[event.target.name] = event.target.value
  //   this.setState({promptResponseTexts: additionalTexts})
  // }

  _submitForm (event) {
    // this.props.sendPrompt(this.state.promptText, this.state.promptResponseTexts)
    this.props.sendPrompt(this.state.promptText)
    event.preventDefault()
    this.setState({ promptText: '' })
  }

  render () {
    return (
      <div className="prompt-wrapper">
        <h3 className="prompt-header">Send a new prompt to all Pairachute pairs:</h3>
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
