import * as types from '../actions/actionTypes'

export function messageInfo (state = {}, action) {
  switch (action.type) {
    case types.FETCH_MESSAGES_SUCCESS:
      return Object.assign({}, state, {
        messages: action.messages
      })
    default:
      return state
  }
}
