// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

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
const auth = getAuth(app);

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  const submit = document.getElementById("submit");

  submit.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Login successful!");
        window.location.href = "learning.html"; // ✅ Redirect to dashboard or learning page
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
        console.error("Login error:", error);
      });
  });
});
