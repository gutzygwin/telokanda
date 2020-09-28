import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";


const firebaseConfig = {
};

firebase.initializeApp(firebaseConfig);
firebase.firestore()

const storage = firebase.storage();

export {
  storage, firebase as default
}
