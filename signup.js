// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCElSztsflZeyVdYD_xH1KYEfNFAwexY98",
  authDomain: "placement-prep-portal.firebaseapp.com",
  projectId: "placement-prep-portal",
  storageBucket: "placement-prep-portal.appspot.com",
  messagingSenderId: "1069359392527",
  appId: "1:1069359392527:web:417d334fa18ba4a800007a",
  measurementId: "G-NBJ1V27FG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // ✅ Auth setup only once

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  const submit = document.getElementById("submit");

  submit.addEventListener("click", function (event) {
    event.preventDefault();

    // Get form inputs
    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate input
    if (!name || !email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    // Create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Signup successful!");

        // Redirect to dashboard page
        window.location.href = "learning.html";  
      })
      .catch((error) => {
        alert("Signup failed: " + error.message);
        console.error("Error during signup:", error);
      });
  });
});
