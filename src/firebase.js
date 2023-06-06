import { initializeApp } from "@firebase/app";
import { getDatabase } from "firebase/database";

function FirebaseDB() {
  const firebaseConfig = {
    apiKey: "AIzaSyARhyHdjgn-CGAK9LxOEsuQeU1UKzBIuQM",
    authDomain: "hotel-customer-relations-c13f3.firebaseapp.com",
    databaseURL:
      "https://hotel-customer-relations-c13f3-default-rtdb.firebaseio.com",
    projectId: "hotel-customer-relations-c13f3",
    storageBucket: "hotel-customer-relations-c13f3.appspot.com",
    messagingSenderId: "882039615619",
    appId: "1:882039615619:web:138dde75911541f160abb6",
  };

  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}

export default FirebaseDB;
