import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";
import {firebaseConfig} from "./env";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };