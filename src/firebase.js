import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCjje2-mjQhyYUxu645QpwrQUbqnUcBYYI",
    authDomain: "recyclopedia-54a58.firebaseapp.com",
    projectId: "recyclopedia-54a58",
    storageBucket: "recyclopedia-54a58.appspot.com",
    messagingSenderId: "93192374927",
    appId: "1:93192374927:web:b1a9c59396fd03ac85fefa",
    measurementId: "G-24N5R02G1M"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;