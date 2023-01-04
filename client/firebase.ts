import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC57PcA7m6Vl6jvlndNxxO-KQrwaaNYn3E",
  authDomain: "dapp-9edaa.firebaseapp.com",
  projectId: "dapp-9edaa",
  storageBucket: "dapp-9edaa.appspot.com",
  messagingSenderId: "367386523647",
  appId: "1:367386523647:web:b43ec0931e64d7e98659ca",
  measurementId: "G-387939Q83K",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const initFirebase = () => {
  return app;
};