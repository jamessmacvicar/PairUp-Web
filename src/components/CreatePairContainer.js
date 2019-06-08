import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsers, createPair } from '../actions/userActions'
import CreatePair from './CreatePair'

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    createPairInfo: state.createPairInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchUsers,
    createPair
  }, dispatch)
}

const CreatePairContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePair)

export default CreatePairContainer
