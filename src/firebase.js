import firebase from 'firebase'

// Your web app's Firebase configuration
const app = firebase.initializeApp ({
  apiKey: "AIzaSyBsCMZ_PPvG6A52Jr2IickKmMRT694ZF8M",
  authDomain: "series-550b6.firebaseapp.com",
  databaseURL: "https://series-550b6.firebaseio.com",
  projectId: "series-550b6",
  storageBucket: "series-550b6.appspot.com",
  messagingSenderId: "1089970229015",
  appId: "1:1089970229015:web:f9a9693cd6f2f58b"
})

export const db = app.firestore()