import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDwWoL8iwmlWpEk7KXY4HsUWetw8qkSdAU",
    authDomain: "tik-tak-toe-classical.firebaseapp.com",
    projectId: "tik-tak-toe-classical",
    storageBucket: "tik-tak-toe-classical.appspot.com",
    messagingSenderId: "916990452372",
    appId: "1:916990452372:web:6614b7f7b9c1ff332aca81",
    databaseURL: "https://tik-tak-toe-classical-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);