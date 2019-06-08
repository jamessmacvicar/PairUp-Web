import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createUser } from '../actions/userActions'
import NewUser from './NewUser'

const mapStateToProps = (state) => {
  return {
    createUserInfo: state.createUserInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createUser
  }, dispatch)
}

const NewUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewUser)

export default NewUserContainer
