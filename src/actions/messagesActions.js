import * as types from './actionTypes'
import fb from '../config/initializeFirebase'
var db = fb.database()

export function fetchMessages () {
  return async function (dispatch) {
    try {
      dispatch({ type: types.FETCH_MESSAGES_ATTEMPT })
      var messagesRef = db.ref('/messages')
      let messages = (await messagesRef.once('value')).val()
      dispatch({ type: types.FETCH_MESSAGES_SUCCESS, messages })

    } catch (e) {
      dispatch({ type: types.FETCH_MESSAGES_FAILURE })
    }
  }
}
