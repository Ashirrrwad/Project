// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Config
const firebaseConfig = {
  apiKey: "AIzaSyCElSztsflZeyVdYD_xH1KYEfNFAwexY98",
  authDomain: "placement-prep-portal.firebaseapp.com",
  projectId: "placement-prep-portal",
  storageBucket: "placement-prep-portal.appspot.com",
  messagingSenderId: "1069359392527",
  appId: "1:1069359392527:web:417d334fa18ba4a800007a",
  measurementId: "G-NBJ1V27FG0"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Dynamic login/logout
const authBtns = document.getElementById("auth-buttons");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // Logged in
    authBtns.innerHTML = `<button id="logoutBtn" class="btn">Logout</button>`;

    document.getElementById("logoutBtn").addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          alert("Logged out successfully!");
          window.location.href = "index.html"; // 👈 redirect to home
        })
        .catch((error) => {
          alert("Logout failed: " + error.message);
        });
    });
  } else {
    // Not logged in
    authBtns.innerHTML = `
      <button class="btn" onclick="window.location.href='login.html'">Login</button>
      <button class="btn" onclick="window.location.href='signup.html'">Sign Up</button>
    `;
  }
});
