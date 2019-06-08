import * as types from '../actions/actionTypes'

export function sentPrompts (state = {}, action) {
  switch (action.type) {
    case types.SEND_PROMPT_SUCCESS:
      return Object.assign({}, state, {
        lastSentPrompt: action.promptData
      })
    default:
      return state
  }
}
