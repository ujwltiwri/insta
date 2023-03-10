// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAahZhwgQElMEwJdwp1HSwrqA4C96iw04E',
  authDomain: 'latest-reel.firebaseapp.com',
  projectId: 'latest-reel',
  storageBucket: 'latest-reel.appspot.com',
  messagingSenderId: '661044342905',
  appId: '1:661044342905:web:9a2c2ea168b3877b3364a8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize firebase Authentication and get a reference to the service
const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }
