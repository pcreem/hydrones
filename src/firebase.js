import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDVwrXM9wH5YXZoO6Yzjfb4iHNEeh6jUBg",
  authDomain: "hydrones-890f9.firebaseapp.com",
  databaseURL: "https://hydrones-890f9-default-rtdb.firebaseio.com",
  projectId: "hydrones-890f9",
  storageBucket: "hydrones-890f9.appspot.com",
  messagingSenderId: "193410127877",
  appId: "1:193410127877:web:496dff59ec95aa0bafe46c"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export default db