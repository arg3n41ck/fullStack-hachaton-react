import firebase from "firebase";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyA_nlq6YN5YW8BzI837HqaaBGIh5FaQY1I",
  authDomain: "login-c418e.firebaseapp.com",
  projectId: "login-c418e",
  storageBucket: "login-c418e.appspot.com",
  messagingSenderId: "461783359320",
  appId: "1:461783359320:web:3b14d18bbcf0cb86a74f2d",
  measurementId: "G-B9CWQPCK7M",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fire;
