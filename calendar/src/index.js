import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var config = {
    apiKey: "AIzaSyDcjt5DFRPZJTWa7s82xkdkgvYh10Mpnws",
    authDomain: "calendar-974c2.firebaseapp.com",
    databaseURL: "https://calendar-974c2.firebaseio.com",
    storageBucket: "calendar-974c2.appspot.com",
    messagingSenderId: "753332683846"
};

firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
