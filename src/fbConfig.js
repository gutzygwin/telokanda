import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBJhEBB80WeklCxlhY7mYhCUFkVg3nCziY",
  authDomain: "telokanda-app.firebaseapp.com",
  databaseURL: "https://telokanda-app.firebaseio.com",
  projectId: "telokanda-app",
  storageBucket: "telokanda-app.appspot.com",
  messagingSenderId: "375388459198",
  appId: "1:375388459198:web:d56594a39084f4b446ceef",
  measurementId: "G-M8WHL40DEQ"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore()

const storage = firebase.storage();

export {
  storage, firebase as default
}