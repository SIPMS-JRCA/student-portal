import { auth, db } from "../firebase.js";

import { protectAdminPage } from "../components/adminGuard.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

protectAdminPage();

// =========================
// Elements
// =========================

const table =
document.getElementById("usersTable");

const searchInput =
document.getElementById("searchUser");

const totalUsers =
document.getElementById("totalUsers");

const studentCount =
document.getElementById("studentCount");

const adminCount =
document.getElementById("adminCount");

let users = [];

// =========================
// Authentication
// =========================

onAuthStateChanged(auth, async(user)=>{

    if(!user){

        location.href="login.html";

        return;

    }

    await loadUsers();

});

// =========================
// Load Users
// =========================

async function loadUsers(){

    const snapshot =
    await getDocs(collection(db,"users"));

    users = [];

    snapshot.forEach(doc=>{

        users.push({

            id:doc.id,

            ...doc.data()

        });

    });

    updateStatistics();

    renderUsers(users);

}

// =========================
// Statistics
// =========================

function updateStatistics(){

    totalUsers.textContent =
    users.length;

    studentCount.textContent =
    users.filter(user=>user.role==="student").length;

    adminCount.textContent =
    users.filter(user=>user.role==="admin").length;

}

// =========================
// Render Table
// =========================

function renderUsers(list){

    if(list.length===0){

        table.innerHTML=`

            <tr>

                <td colspan="5">

                    No users found.

                </td>

            </tr>

        `;

        return;

    }

    table.innerHTML="";

    list.forEach(user=>{

        table.innerHTML += `

        <tr>

            <td>

                ${user.username || "-"}

            </td>

            <td>

                ${user.email || "-"}

            </td>

            <td>

                <span class="role-badge ${user.role==="admin"?"role-admin":"role-student"}">

                    ${user.role}

                </span>

            </td>

            <td>

                <span class="status-active">

                    Active

                </span>

            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn edit-btn"
                        data-id="${user.id}">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="action-btn delete-btn"
                        data-id="${user.id}">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        </tr>

        `;

    });

    attachEvents();

}

// =========================
// Search
// =========================

searchInput.addEventListener("input",()=>{

    const keyword =
    searchInput.value.toLowerCase();

    const filtered =
    users.filter(user=>{

        return(

            (user.username||"")
            .toLowerCase()
            .includes(keyword)

            ||

            (user.email||"")
            .toLowerCase()
            .includes(keyword)

        );

    });

    renderUsers(filtered);

});

// =========================
// Buttons
// =========================

function attachEvents(){

    document.querySelectorAll(".edit-btn")
    .forEach(button=>{

        button.onclick=()=>{

            alert(
                "Edit feature coming soon."
            );

        };

    });

    document.querySelectorAll(".delete-btn")
    .forEach(button=>{

        button.onclick=()=>{

            alert(
                "Delete feature coming soon."
            );

        };

    });

}