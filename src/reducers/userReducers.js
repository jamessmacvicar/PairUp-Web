import * as types from '../actions/actionTypes'

export function userInfo (state = {}, action) {
  switch (action.type) {
    case types.FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        users: action.users
      })
    default:
      return state
  }
}

export function createUserInfo (state = {errorMessage: '', successMessage: ''}, action) {
  switch(action.type) {
    case types.CREATE_USER_SUCCESS:
    return Object.assign({}, state, {
      errorMessage: '',
      successMessage: action.successMessage
    })
    case types.CREATE_USER_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.errorMessage,
        successMessage: ''
      })
    default:
      return state
  }
}

export function createPairInfo (state = {errorMessage: '', successMessage: ''}, action) {
  switch(action.type) {
    case types.CREATE_PAIR_SUCCESS:
    return Object.assign({}, state, {
      errorMessage: '',
      successMessage: action.successMessage
    })
    case types.CREATE_PAIR_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.errorMessage,
        successMessage: ''
      })
    default:
      return state
  }
}

export function deletePairInfo (state = {errorMessage: '', successMessage: ''}, action) {
  switch(action.type) {
    case types.DELETE_PAIR_SUCCESS:
    return Object.assign({}, state, {
      errorMessage: '',
      successMessage: action.successMessage
    })
    case types.DELETE_PAIR_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.errorMessage,
        successMessage: ''
      })
    default:
      return state
  }
}
