import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCwOBSffZnsfNEPJnaDRwzFfqizOunsWS8",
  authDomain: "hack-test2-d3a7a.firebaseapp.com",
  projectId: "hack-test2-d3a7a",
  storageBucket: "hack-test2-d3a7a.appspot.com",
  messagingSenderId: "69919684912",
  appId: "1:69919684912:web:58fcfb4123e242b9b830f5"
};

// init firebase
const app = initializeApp(firebaseConfig)

// init services
const projectFirestore = getFirestore(app)
const projectAuth = getAuth(app)
const projectStorage = getStorage(app)

// timestamp
const timestamp = serverTimestamp()

export { projectFirestore, projectAuth, projectStorage, timestamp }

