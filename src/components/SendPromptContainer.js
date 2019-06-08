import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sendPrompt } from '../actions/promptActions'
import SendPrompt from './SendPrompt'

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    sendPrompt
  }, dispatch)
}

const SendPromptContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SendPrompt)

export default SendPromptContainer
