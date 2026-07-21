import { protectStudentPage } from "../components/studentGuard.js";

import {

    getDrills

}
from "../services/drillService.js";

protectStudentPage();

// ======================================
// Elements
// ======================================

const drillList =
document.getElementById("drillList");

// ======================================

let drills=[];

// ======================================
// Load Drills
// ======================================

async function loadDrills(){

    drills=await getDrills();

    renderDrills();

}

// ======================================
// Render Drills
// ======================================

function renderDrills(){

    if(drills.length===0){

        drillList.innerHTML=`

        <div class="empty-drills">

            <i class="fa-solid fa-calendar-days"></i>

            <h2>

                No Drill Schedule

            </h2>

            <p>

                There are currently no scheduled drills.

            </p>

        </div>

        `;

        return;

    }

    drillList.innerHTML="";

    drills.forEach(drill=>{

        const date=

        drill.createdAt

        ?

        drill.createdAt.toDate().toLocaleDateString()

        :

        drill.date || "";

        drillList.innerHTML+=`

        <div class="drill-card">

            <div class="drill-header">

                <div class="drill-title">

                    ${drill.title}

                </div>

                <span class="drill-type">

                    ${drill.type}

                </span>

            </div>

            <div class="drill-location">

                <i class="fa-solid fa-location-dot"></i>

                ${drill.location}

            </div>

            <div class="drill-date">

                <i class="fa-solid fa-calendar"></i>

                ${date}

            </div>

            <div class="drill-time">

                <i class="fa-solid fa-clock"></i>

                ${drill.time}

            </div>

        </div>

        `;

    });

}

// ======================================
// Start
// ======================================

loadDrills();