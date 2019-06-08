import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsers } from '../actions/userActions'
import { fetchMessages } from '../actions/messagesActions'
import { fetchThreads } from '../actions/threadsActions'
import UserManagement from './UserManagement'

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    messageInfo: state.messageInfo,
    threadInfo: state.threadInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchUsers,
    fetchMessages,
    fetchThreads,
  }, dispatch)
}

const UserManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement)

export default UserManagementContainer
