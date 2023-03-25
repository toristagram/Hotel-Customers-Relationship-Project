import { initializeApp } from "@firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyARhyHdjgn-CGAK9LxOEsuQeU1UKzBIuQM",
  authDomain: "hotel-customer-relations-c13f3.firebaseapp.com",
  projectId: "hotel-customer-relations-c13f3",
  storageBucket: "hotel-customer-relations-c13f3.appspot.com",
  messagingSenderId: "882039615619",
  appId: "1:882039615619:web:138dde75911541f160abb6",
};

initializeApp(firebaseConfig);
const database = getDatabase();
export const accountsRef = ref(database, "accounts");
export const roomsRef = ref(database, "rooms");
