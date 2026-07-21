import { auth, db } from "../firebase.js";

import { protectAdminPage } from "../components/adminGuard.js";

import {
    onAuthStateChanged,
    updatePassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

protectAdminPage();

// =========================
// Elements
// =========================

const profileImage = document.getElementById("profileImage");

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const roleInput = document.getElementById("role");
const bioInput = document.getElementById("bio");

const saveBtn = document.getElementById("saveProfile");
const logoutBtn = document.getElementById("logoutBtn");

const passwordBtn = document.getElementById("changePassword");

const passwordModal =
document.getElementById("passwordModal");

const newPasswordInput =
document.getElementById("newPassword");

const confirmPasswordInput =
document.getElementById("confirmPassword");

const cancelPasswordBtn =
document.getElementById("cancelPassword");

const confirmPasswordBtn =
document.getElementById("confirmPasswordBtn");

let userDocRef = null;

// =========================
// Load User
// =========================

onAuthStateChanged(auth, async(user)=>{

    if(!user){

        location.href="login.html";

        return;

    }

    userDocRef =
    doc(db,"users",user.uid);

    const snapshot =
    await getDoc(userDocRef);

    if(!snapshot.exists()){

        alert("User not found.");

        return;

    }

    const data =
    snapshot.data();

    usernameInput.value =
    data.username || "";

    emailInput.value =
    data.email || "";

    roleInput.value =
    data.role || "";

    bioInput.value =
    data.bio || "";

    document.getElementById("profileName").textContent =
    data.username || "Administrator";

    document.getElementById("profileRole").textContent =
    "Administrator";

    document.getElementById("overviewUsername").textContent =
    data.username || "-";

    document.getElementById("overviewEmail").textContent =
    data.email || "-";

    document.getElementById("overviewRole").textContent =
    data.role || "-";

    if(data.photoURL){

        profileImage.src =
        data.photoURL;

    }

});

// =========================
// Save Profile
// =========================

saveBtn.addEventListener("click",async()=>{

    if(!userDocRef) return;

    await updateDoc(userDocRef,{

        username:
        usernameInput.value.trim(),

        bio:
        bioInput.value.trim()

    });

    document.getElementById("profileName").textContent =
    usernameInput.value;

    document.getElementById("overviewUsername").textContent =
    usernameInput.value;

    alert("✅ Profile updated.");

});

// =========================
// Logout
// =========================

logoutBtn.addEventListener("click",async()=>{

    await signOut(auth);

    location.href="login.html";

});

// =========================
// Password Modal
// =========================

passwordBtn.addEventListener("click",()=>{

    passwordModal.classList.add("show");

    newPasswordInput.value="";

    confirmPasswordInput.value="";

});

cancelPasswordBtn.addEventListener("click",()=>{

    passwordModal.classList.remove("show");

});

passwordModal.addEventListener("click",(e)=>{

    if(e.target===passwordModal){

        passwordModal.classList.remove("show");

    }

});

confirmPasswordBtn.addEventListener("click",async()=>{

    const newPassword =
    newPasswordInput.value.trim();

    const confirmPassword =
    confirmPasswordInput.value.trim();

    if(newPassword.length<6){

        alert("Password must be at least 6 characters.");

        return;

    }

    if(newPassword!==confirmPassword){

        alert("Passwords do not match.");

        return;

    }

    try{

        await updatePassword(
            auth.currentUser,
            newPassword
        );

        alert("✅ Password updated successfully.");

        passwordModal.classList.remove("show");

    }

    catch(error){

        alert(error.message);

    }

});