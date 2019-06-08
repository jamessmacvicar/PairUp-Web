import { combineReducers } from 'redux'
import { sentPrompts } from './promptReducers'
import { userInfo, createUserInfo, createPairInfo } from './userReducers'
import { messageInfo } from './messageReducers'
import { threadInfo } from './threadReducers'

const reducer = combineReducers({
  sentPrompts,
  userInfo,
  createUserInfo,
  createPairInfo,
  messageInfo,
  threadInfo,
});

export default reducer;
