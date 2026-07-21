import { auth, db } from "../firebase.js";

import { protectAdminPage } from "../components/adminGuard.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

protectAdminPage();

// ======================================
// Elements
// ======================================

const totalUsers =
document.getElementById("totalUsers");

const totalStudents =
document.getElementById("totalStudents");

const totalAdmins =
document.getElementById("totalAdmins");

const totalAnnouncements =
document.getElementById("totalAnnouncements");

const totalReports =
document.getElementById("totalReports");

const activeAlerts =
document.getElementById("activeAlerts");

const recentActivity =
document.getElementById("recentActivity");

const currentDate =
document.getElementById("currentDate");

// ======================================
// Authentication
// ======================================

onAuthStateChanged(auth, async(user)=>{

    if(!user){

        location.href="login.html";

        return;

    }

    currentDate.textContent=
    new Date().toLocaleDateString(
        undefined,
        {
            weekday:"long",
            year:"numeric",
            month:"long",
            day:"numeric"
        }
    );

    loadStatistics();

    loadRecentActivity();

});

// ======================================
// Statistics
// ======================================

async function loadStatistics(){

    // Users

    const users=
    await getDocs(
        collection(db,"users")
    );

    totalUsers.textContent=
    users.size;

    // Students

    const students=
    await getDocs(

        query(

            collection(db,"users"),

            where("role","==","student")

        )

    );

    totalStudents.textContent=
    students.size;

    // Admins

    const admins=
    await getDocs(

        query(

            collection(db,"users"),

            where("role","==","admin")

        )

    );

    totalAdmins.textContent=
    admins.size;

    // Announcements

    const announcements=
    await getDocs(

        collection(db,"announcements")

    );

    totalAnnouncements.textContent=
    announcements.size;

    // Incident Reports

    try{

        const reports=
        await getDocs(

            collection(db,"incidentReports")

        );

        totalReports.textContent=
        reports.size;

    }

    catch{

        totalReports.textContent="0";

    }

    // Emergency Alerts

    try{

        const alerts=
        await getDocs(

            query(

                collection(db,"emergencyAlerts"),

                where("status","==","active")

            )

        );

        activeAlerts.textContent=
        alerts.size;

    }

    catch{

        activeAlerts.textContent="0";

    }

}

// ======================================
// Recent Activity
// ======================================

async function loadRecentActivity(){

    try{

        const snapshot=
        await getDocs(

            query(

                collection(db,"announcements"),

                orderBy("createdAt","desc"),

                limit(5)

            )

        );

        if(snapshot.empty){

            recentActivity.innerHTML=`

                <div class="activity-item">

                    No recent activity.

                </div>

            `;

            return;

        }

        recentActivity.innerHTML="";

        snapshot.forEach(doc=>{

            const item=doc.data();

            const date=item.createdAt
            ? item.createdAt.toDate().toLocaleString()
            : "";

            recentActivity.innerHTML+=`

                <div class="activity-item">

                    <strong>

                        📢 ${item.title}

                    </strong>

                    <br><br>

                    <small>

                        ${item.postedBy}

                    </small>

                    <br>

                    <small>

                        ${date}

                    </small>

                </div>

            `;

        });

    }

    catch(error){

        console.error(error);

        recentActivity.innerHTML=`

            <div class="activity-item">

                Unable to load activity.

            </div>

        `;

    }

}