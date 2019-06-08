import * as firebase from 'firebase'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCZLWVwyg4dnTcWWotXpqYfn-RF02mX4r4",
  authDomain: "pairachute-5adf4.firebaseapp.com",
  databaseURL: "https://pairachute-5adf4.firebaseio.com",
  storageBucket: "pairachute-5adf4.appspot.com",
  messagingSenderId: "803241803289",
}

const fb = firebase.initializeApp(firebaseConfig)
export default fb
