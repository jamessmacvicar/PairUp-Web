import * as types from './actionTypes'
import fb from '../config/initializeFirebase'
var db = fb.database()

export function sendPrompt (prompt, promptResponses) {
  return async function (dispatch) {
    try {
      dispatch({type: types.SEND_PROMPT_ATTEMPT})

      // insert new prompt into /prompts/
      var newPromptKey = db.ref('/prompts').push().key
      var promptData = {
        prompt: prompt,
        timestamp: Date.now(),
        recipients: 'all'
      }

      var updates = {}
      updates['/prompts/' + newPromptKey] = promptData

      // insert new prompt message into each message thread
      var newPromptMessage = {
        message: prompt,
        senderId: 'prompt',
        timestamp: Date.now()
      }
      // get all thread_ids
      // update /messages for that thread_id
      var allThreadsRef = db.ref('/threads')
      let allThreads = (await allThreadsRef.once('value')).val()
      for (var thread_id in allThreads) {
        if (allThreads[thread_id].isReflection === true) {
          var newThreadMsgKey = db.ref('/messages').push().key
          updates['/messages/' + thread_id + '/' + newThreadMsgKey] = newPromptMessage
        }
      }
      await db.ref().update(updates)
      dispatch({type: types.SEND_PROMPT_SUCCESS, promptData})
    } catch(err) {
      console.log(err)
      dispatch({type: types.SEND_PROMPT_FAILURE})
    }
  }
}
