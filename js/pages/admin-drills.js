import { protectAdminPage } from "../components/adminGuard.js";

import {

    createDrill,
    getDrills,
    updateDrill,
    deleteDrill

}
from "../services/drillService.js";

protectAdminPage();

// ======================================
// Elements
// ======================================

const titleInput =
document.getElementById("drillTitle");

const typeInput =
document.getElementById("drillType");

const locationInput =
document.getElementById("drillLocation");

const dateInput =
document.getElementById("drillDate");

const timeInput =
document.getElementById("drillTime");

const postBtn =
document.getElementById("postDrillBtn");

const drillList =
document.getElementById("drillList");

// ======================================

let drills=[];

// ======================================
// Load Drills
// ======================================

async function loadDrills(){

    drills =
    await getDrills();

    renderDrills();

}

// ======================================
// Create Drill
// ======================================

postBtn.addEventListener("click",async()=>{

    const title=
    titleInput.value.trim();

    const type=
    typeInput.value;

    const location=
    locationInput.value.trim();

    const date=
    dateInput.value;

    const time=
    timeInput.value;

    if(

        title==="" ||

        location==="" ||

        date==="" ||

        time===""

    ){

        alert("Please complete all fields.");

        return;

    }

    await createDrill({

        title,

        type,

        location,

        date,

        time

    });

    titleInput.value="";

    locationInput.value="";

    dateInput.value="";

    timeInput.value="";

    typeInput.value="Fire Drill";

    await loadDrills();

});

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

                Create your first drill schedule.

            </p>

        </div>

        `;

        return;

    }

    drillList.innerHTML="";

    drills.forEach(drill=>{

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

            <div class="drill-info">

                <div>

                    <strong>Location:</strong>

                    ${drill.location}

                </div>

                <div>

                    <strong>Date:</strong>

                    ${drill.date}

                </div>

                <div>

                    <strong>Time:</strong>

                    ${drill.time}

                </div>

            </div>

            <div class="drill-footer">

                <div class="drill-date">

                    Created Drill Schedule

                </div>

                <div class="drill-actions">

                    <button
                    class="edit-drill"
                    data-id="${drill.id}">

                    <i class="fa-solid fa-pen"></i>

                    Edit

                    </button>

                    <button
                    class="delete-drill"
                    data-id="${drill.id}">

                    <i class="fa-solid fa-trash"></i>

                    Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    // ======================================
    // Edit Drill
    // ======================================

    document.querySelectorAll(".edit-drill")
    .forEach(button=>{

        button.addEventListener("click",async()=>{

            const id=button.dataset.id;

            const current=

            drills.find(d=>d.id===id);

            if(!current) return;

            const title=

            prompt(

                "Edit drill title:",

                current.title

            );

            if(title===null) return;

            const type=

            prompt(

                "Drill Type (Fire Drill, Earthquake Drill, Lockdown Drill, Evacuation Drill)",

                current.type

            );

            if(type===null) return;

            const location=

            prompt(

                "Location:",

                current.location

            );

            if(location===null) return;

            const date=

            prompt(

                "Date (YYYY-MM-DD):",

                current.date

            );

            if(date===null) return;

            const time=

            prompt(

                "Time (HH:MM):",

                current.time

            );

            if(time===null) return;

            await updateDrill(id,{

                title:title.trim(),

                type:type.trim(),

                location:location.trim(),

                date:date.trim(),

                time:time.trim()

            });

            await loadDrills();

        });

    });

    // ======================================
    // Delete Drill
    // ======================================

    document.querySelectorAll(".delete-drill")
    .forEach(button=>{

        button.addEventListener("click",async()=>{

            const confirmed=confirm(

                "Delete this drill schedule?"

            );

            if(!confirmed) return;

            await deleteDrill(

                button.dataset.id

            );

            await loadDrills();

        });

    });

}

// ======================================
// Start
// ======================================

loadDrills();