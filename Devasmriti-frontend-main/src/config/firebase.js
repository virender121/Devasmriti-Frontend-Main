import firebase from "firebase"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv-FqVuLnkmBrB6frI_hg1cRB66gwrwqc",
  authDomain: "devasmriti-daa4b.firebaseapp.com",
  projectId: "devasmriti-daa4b",
  storageBucket: "devasmriti-daa4b.appspot.com",
  messagingSenderId: "282406795533",
  appId: "1:282406795533:web:017f3f7e8416e289f55844"
}

firebase.initializeApp(firebaseConfig)

let auth = firebase.auth()

export { auth, firebase }

