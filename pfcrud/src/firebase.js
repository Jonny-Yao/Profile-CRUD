import firebase from 'firebase';


  // Your web app's Firebase configuration
  const config = {
    apiKey: "AIzaSyC61eiqInkHh8x144pkVIUuQqLp3BHBHtI",
    authDomain: "profilescrud.firebaseapp.com",
    databaseURL: "https://profilescrud.firebaseio.com",
    projectId: "profilescrud",
    storageBucket: "profilescrud.appspot.com",
    messagingSenderId: "970175743096",
    appId: "1:970175743096:web:3b2f44716243906ea7198d"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  export default firebase;