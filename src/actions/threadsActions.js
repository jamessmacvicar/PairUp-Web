import * as types from './actionTypes'
import fb from '../config/initializeFirebase'
var db = fb.database()

export function fetchThreads () {
  return async function (dispatch) {
    try {
      dispatch({ type: types.FETCH_THREADS_ATTEMPT })
      var threadsRef = db.ref('/threads')
      let threads = (await threadsRef.once('value')).val()
      dispatch({ type: types.FETCH_THREADS_SUCCESS, threads })

    } catch (e) {
      dispatch({ type: types.FETCH_THREADS_FAILURE })
    }
  }
}
