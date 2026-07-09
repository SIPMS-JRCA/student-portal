import { auth } from "./firebase.js";

import {
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

    } else {

        document.getElementById("welcomeMessage").textContent =
            "Welcome!";

    }

});

document.getElementById("logoutBtn").addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "index.html";

});