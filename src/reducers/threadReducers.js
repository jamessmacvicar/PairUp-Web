import * as types from '../actions/actionTypes'

export function threadInfo (state = {}, action) {
  switch (action.type) {
    case types.FETCH_THREADS_SUCCESS:
      return Object.assign({}, state, {
        threads: action.threads
      })
    default:
      return state
  }
}
