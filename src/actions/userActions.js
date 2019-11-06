import * as types from './actionTypes'
import fb from '../config/initializeFirebase'
var db = fb.database()

export function fetchUsers () {
  return async function (dispatch) {
    try {
      dispatch({ type: types.FETCH_USERS_ATTEMPT })
      var usersRef = db.ref('/users')
      let users = (await usersRef.once('value')).val()
      dispatch({ type: types.FETCH_USERS_SUCCESS, users })

    } catch (e) {
      dispatch({ type: types.FETCH_USERS_FAILURE })
    }
  }
}

export function createUser (firstName, lastName, emailAddress, reflectionType, organization) {
  return async function (dispatch) {
    try {
      dispatch({ type: types.CREATE_USER_ATTEMPT })
      let response = await fb.auth().createUserWithEmailAndPassword(emailAddress, 'pairachute')
      await response.updateProfile({displayName: firstName + ' ' + lastName})

      var updates = {}
      var newUserInfo = {
        displayName: firstName + ' ' + lastName,
        firstName: firstName,
        lastName: lastName,
        email: emailAddress,
        reflectionType: reflectionType,
        threads: {},
        isPaired: false,
        showWelcome: true,
        organization: organization,
      }
      if (reflectionType === 'solo') {
        var threadKey = db.ref('threads').push().key
        newUserInfo['threads'] = { reflectionOnly: threadKey }
      }
      updates['/users/' + response.uid] = newUserInfo
      var threadInfo = {
        type: 'reflectionOnly',
        isReflection: true,
        users: {}
      }
      threadInfo.users[response.uid] = firstName + ' ' + lastName
      updates['/threads/' + threadKey] = threadInfo

      await db.ref().update(updates)
      dispatch(createUserSuccess('Successfully created new user!'))
    } catch (error) {
      dispatch(createUserFailure(error.message))
    }
  }
}

export function createPair (user1, user2, reflectionType) {
  return async function (dispatch) {
    try {
      dispatch({ type: types.CREATE_PAIR_ATTEMPT })
      var updates = {}
      let user1Obj = (await db.ref('/users/' + user1).once('value')).val()
      let user2Obj = (await db.ref('/users/' + user2).once('value')).val()
      let organization = user1Obj.organization
      var user1Info = Object.assign({}, user1Obj, {
        isPaired: true,
        pairId: user2
      })
      var user2Info = Object.assign({}, user2Obj, {
        isPaired: true,
        pairId: user1
      })

      let threadKey = await db.ref('threads').push().key
      var threadInfo = {
        type: '',
        isReflection: null,
        users: {},
        organization: organization
      }

      threadInfo.users[user1] = user1Obj.displayName
      threadInfo.users[user2] = user2Obj.displayName
      if (reflectionType === 'solo') {
        threadInfo.type = 'chatOnly'
        threadInfo.isReflection = false
        user1Info['threads']['chatOnly'] = threadKey
        user2Info['threads']['chatOnly'] = threadKey
      } else {
        threadInfo.type = 'reflectionAndChat'
        threadInfo.isReflection = true
        user1Info['threads'] = { reflectionAndChat: threadKey }
        user2Info['threads'] = { reflectionAndChat: threadKey }
      }

      updates['/users/' + user1] = user1Info
      updates['/users/' + user2] = user2Info
      updates['/threads/' + threadKey] = threadInfo
      await db.ref().update(updates)
      dispatch(createPairSuccess('Successfully created new pair!'))
    } catch (error) {
      dispatch(createPairFailure(error.message))
    }
  }
}

export function deletePair(user1, user2) {
  return async function (dispatch) {
    try {
      dispatch({ type: types.DELETE_PAIR_ATTEMPT })
      console.log("GOLD")
      /*var updates = {}
      let user1Obj = (await db.ref('/users/' + user1).once('value')).val()
      let user2Obj = (await db.ref('/users/' + user2).once('value')).val()

      var user1Info = Object.assign({}, user1Obj, {
        isPaired: false,
        pairId: null
      })
      var user2Info = Object.assign({}, user2Obj, {
        isPaired: false,
        pairId: null
      })

      user1Info['threads'] = null
      user2Info['threads'] = null

      updates['/users/' + user1] = user1Info
      updates['/users/' + user2] = user2Info
      await db.ref().update(updates)
      dispatch(deletePairSuccess('Successfully unpaired pair!'))*/
    } catch (error) {
      console.log("UGH")
      dispatch(deletePairFailure(error.message))
    }
  }
}

function createUserSuccess(successMessage) {
  return {
    type: types.CREATE_USER_SUCCESS,
    successMessage
  }
}

function createPairSuccess(successMessage) {
  return {
    type: types.CREATE_PAIR_SUCCESS,
    successMessage
  }
}

function deletePairSuccess(successMessage) {
  return {
    type: types.DELETE_PAIR_SUCCESS,
    successMessage
  }
}

function createUserFailure(errorMessage) {
  return {
    type: types.CREATE_USER_FAILURE,
    errorMessage
  }
}

function createPairFailure(errorMessage) {
  return {
    type: types.CREATE_PAIR_FAILURE,
    errorMessage
  }
}

function deletePairFailure(errorMessage) {
  return {
    type: types.DELETE_PAIR_FAILURE,
    errorMessage
  }
}
