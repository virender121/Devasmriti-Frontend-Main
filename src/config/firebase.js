import firebase from "firebase"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOn7GJg4y38i8LMM9mH8vM4zW0l_8MuvM",
  authDomain: "devasmriti-93ff2.firebaseapp.com",
  projectId: "devasmriti-93ff2",
  storageBucket: "devasmriti-93ff2.appspot.com",
  messagingSenderId: "41441735245",
  appId: "1:41441735245:web:2de786c9f951cedadc6204",
};

firebase.initializeApp(firebaseConfig)

let auth = firebase.auth()

export { auth, firebase }

