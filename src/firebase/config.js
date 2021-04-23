import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBFxkO5QP9Z0xaf2IGfjo - oghoEpQOQXMM",
    authDomain: "galleryish-8d74e.firebaseapp.com",
    projectId: "galleryish-8d74e",
    storageBucket: "galleryish-8d74e.appspot.com",
    messagingSenderId: "218109019987",
    appId: "1:218109019987:web:b1a61f4a05c0e9be21c3a6",
    measurementId: "G-HSS1W03VGE",
};

firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, projectAuth, timestamp };
