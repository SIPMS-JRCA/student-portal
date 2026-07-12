import { auth, db } from "../firebase.js";

import {
    onAuthStateChanged,
    updatePassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// Elements
const profileImage = document.getElementById("profileImage");
const profileUpload = document.getElementById("profileUpload");

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const roleInput = document.getElementById("role");
const bioInput = document.getElementById("bio");

const saveBtn = document.getElementById("saveProfile");
const passwordBtn = document.getElementById("changePassword");

const passwordModal = document.getElementById("passwordModal");

const newPasswordInput = document.getElementById("newPassword");

const confirmPasswordInput = document.getElementById("confirmPassword");

const cancelPasswordBtn = document.getElementById("cancelPassword");

const confirmPasswordBtn = document.getElementById("confirmPasswordBtn");

let userDocRef = null;

// Load user
onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    userDocRef = doc(db, "users", user.uid);

    const snapshot = await getDoc(userDocRef);

    if (!snapshot.exists()) {

        alert("User profile not found.");

        return;

    }

    const data = snapshot.data();

    usernameInput.value = data.username || "";
    emailInput.value = data.email || "";
    roleInput.value = data.role || "";
    bioInput.value = data.bio || "";

    document.getElementById("overviewUsername").textContent =
    data.username || "-";

    document.getElementById("overviewEmail").textContent =
    data.email || "-";

    document.getElementById("overviewRole").textContent =
    data.role || "-";

    if (data.photoURL) {
        profileImage.src = data.photoURL;
    }

});

// Save profile
saveBtn.addEventListener("click", async () => {

    if (!userDocRef) return;

    await updateDoc(userDocRef, {

        username: usernameInput.value.trim(),
        bio: bioInput.value.trim()

    });

    alert("✅ Profile updated successfully!");

});

// Change password
// =======================
// Password Modal
// =======================

passwordBtn.addEventListener("click", () => {

    passwordModal.classList.add("show");

    newPasswordInput.value = "";

    confirmPasswordInput.value = "";

});

cancelPasswordBtn.addEventListener("click", () => {

    passwordModal.classList.remove("show");

});

confirmPasswordBtn.addEventListener("click", async () => {

    const newPassword = newPasswordInput.value.trim();

    const confirmPassword = confirmPasswordInput.value.trim();

    if (newPassword.length < 6) {

        alert("Password must be at least 6 characters.");

        return;

    }

    if (newPassword !== confirmPassword) {

        alert("Passwords do not match.");

        return;

    }

    try {

        await updatePassword(auth.currentUser, newPassword);

        alert("✅ Password updated successfully!");

        passwordModal.classList.remove("show");

    }

    catch(error){

        alert(error.message);

    }

});

// Close modal when clicking outside

passwordModal.addEventListener("click",(e)=>{

    if(e.target===passwordModal){

        passwordModal.classList.remove("show");

    }

});

// Temporary profile picture preview
// (Disabled until we rebuild profile picture upload)

/*
profileUpload.addEventListener("change", () => {

    const file = profileUpload.files[0];

    if (!file) return;

    profileImage.src = URL.createObjectURL(file);

});
*/