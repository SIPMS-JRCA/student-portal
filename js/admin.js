import { auth, db } from "./firebase.js";

import {
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    addDoc,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";



// Check login
onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

    }

});



// POST ANNOUNCEMENT
document.getElementById("postBtn").addEventListener("click", async () => {

    const title =
        document.getElementById("title").value;

    const message =
        document.getElementById("message").value;

    if(title==="" || message===""){

        alert("Please fill in everything.");

        return;

    }

    await addDoc(collection(db,"announcements"),{

        title:title,

        message:message,

        createdAt:serverTimestamp()

    });

    alert("Announcement Posted!");

    document.getElementById("title").value="";

    document.getElementById("message").value="";

});



// SHOW ANNOUNCEMENTS
const announcementList =
document.getElementById("announcementList");

onSnapshot(
collection(db,"announcements"),

(snapshot)=>{

announcementList.innerHTML="";

snapshot.forEach((doc)=>{

const data=doc.data();

announcementList.innerHTML+=`

<div class="section">

<h3>${data.title}</h3>

<p>${data.message}</p>

</div>

`;

});

});