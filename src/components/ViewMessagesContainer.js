import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchThreads } from '../actions/threadsActions'
import { fetchMessages } from '../actions/messagesActions'
import { fetchUsers } from '../actions/userActions'
import ViewMessages from './ViewMessages'

const mapStateToProps = (state) => {
  return {
    threadInfo: state.threadInfo,
    messageInfo: state.messageInfo,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchThreads,
    fetchMessages,
    fetchUsers
  }, dispatch)
}

const ViewMessagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewMessages)

export default ViewMessagesContainer
