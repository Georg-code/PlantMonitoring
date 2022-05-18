import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: process.env.GOOGLE_API_KEY,

  authDomain: process.env.GOOGLE_AUTH_DOMAIN,

  databaseURL: process.env.GOOGLE_BASE_URL,

  projectId: process.env.GOOGLE_PROJECT_ID,

  storageBucket: process.env.GOOGLE_STORAGE_BUCKET,

  messagingSenderId: process.env.GOOGLE_SENDER_ID,

  appId: process.env.GOOGLE_APP_ID

};




export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
