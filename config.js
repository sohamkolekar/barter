import firebase from 'firebase'

require('@firebase/firestore')
 

const firebaseConfig = {
    apiKey: "AIzaSyDlFFwV4xzaRszW4ScoGqZ_Lky9DVsxtMA",
    authDomain: "barter-f865e.firebaseapp.com",
    projectId: "barter-f865e",
    storageBucket: "barter-f865e.appspot.com",
    messagingSenderId: "262120636077",
    appId: "1:262120636077:web:5f27ca5281cc7c3a589024"
  };
  
firebase.initializeApp(firebaseConfig)

export default firebase.firestore()