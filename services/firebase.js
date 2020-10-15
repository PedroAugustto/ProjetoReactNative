import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAZp7WdrQRbZsft4rtLpBNu2QHOh6DfjgM",
    authDomain: "projeto-final-reactnative.firebaseapp.com",
    databaseURL: "https://projeto-final-reactnative.firebaseio.com",
    projectId: "projeto-final-reactnative",
    storageBucket: "projeto-final-reactnative.appspot.com",
    messagingSenderId: "448435579913",
    appId: "1:448435579913:web:3ed554cfdc41d11d1f1cd8"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);