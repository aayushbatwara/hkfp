import {initializeApp} from "firebase/app" ;

import {getDatabase, ref, set, get, push, child} from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyBISvEUsG3ZQXrI6weuuzE5K22BNrJ1P9k",
    authDomain: "hkfp-mobile-app.firebaseapp.com",
    projectId: "hkfp-mobile-app",
    storageBucket: "hkfp-mobile-app.appspot.com",
    messagingSenderId: "1086703463686",
    appId: "1:1086703463686:web:f1f9ce86047233e3694287",
    measurementId: "G-ZTH9YT0MKE"
  };

  export const _ = initializeApp(firebaseConfig);
  const db = getDatabase();
  const iosTokens = ref(db, 'ios');

  export const addToken = async (newToken: string) => {
    const newPostRef = push(iosTokens);
    set(newPostRef, {
        key: newPostRef.key,
        token: newToken
      });
    console.log("Saved notification token " + newToken)
  };