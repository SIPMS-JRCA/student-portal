import { protectAdminPage } from "../components/adminGuard.js";

import {

    createEmergencyAlert,
    getEmergencyAlerts,
    updateEmergencyAlert,
    deleteEmergencyAlert

}
from "../services/emergencyService.js";

protectAdminPage();

// ======================================
// Elements
// ======================================

const titleInput =
document.getElementById("alertTitle");

const messageInput =
document.getElementById("alertMessage");

const levelInput =
document.getElementById("alertLevel");

const sendBtn =
document.getElementById("sendAlertBtn");

const alertList =
document.getElementById("alertList");

// ======================================

let alerts = [];

// ======================================
// Load Alerts
// ======================================

async function loadAlerts(){

    alerts =
    await getEmergencyAlerts();

    renderAlerts();

}

// ======================================
// Create Alert
// ======================================

sendBtn.addEventListener("click",async()=>{

    const title =
    titleInput.value.trim();

    const message =
    messageInput.value.trim();

    const level =
    levelInput.value;

    if(title==="" || message===""){

        alert("Please complete all fields.");

        return;

    }

    await createEmergencyAlert({

        title,

        message,

        level

    });

    titleInput.value="";

    messageInput.value="";

    levelInput.value="Emergency";

    await loadAlerts();

});

// ======================================
// Render Alerts
// ======================================

function renderAlerts(){

    if(alerts.length===0){

        alertList.innerHTML=`

        <div class="empty-alerts">

            <i class="fa-solid fa-triangle-exclamation"></i>

            <h2>

                No Emergency Alerts

            </h2>

            <p>

                Create your first emergency alert.

            </p>

        </div>

        `;

        return;

    }

    alertList.innerHTML="";

    alerts.forEach(alert=>{

        let badge="level-emergency";

        if(alert.level==="Warning"){

            badge="level-warning";

        }

        else if(alert.level==="Advisory"){

            badge="level-advisory";

        }

        const date=

        alert.createdAt

        ?

        alert.createdAt.toDate().toLocaleString()

        :

        "";

        alertList.innerHTML+=`

        <div class="alert-card">

            <div class="alert-header">

                <div>

                    <div class="alert-title">

                        ${alert.title}

                    </div>

                </div>

                <span class="alert-level ${badge}">

                    ${alert.level}

                </span>

            </div>

            <div class="alert-message">

                ${alert.message}

            </div>

            <div class="alert-footer">

                <div class="alert-date">

                    ${date}

                </div>

                <div class="alert-actions">

                    <button
                        class="edit-alert"
                        data-id="${alert.id}">

                        <i class="fa-solid fa-pen"></i>

                        Edit

                    </button>

                    <button
                        class="delete-alert"
                        data-id="${alert.id}">

                        <i class="fa-solid fa-trash"></i>

                        Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

// ======================================
// Edit Alert
// ======================================

    document.querySelectorAll(".edit-alert")
    .forEach(button=>{

        button.addEventListener("click",async()=>{

            const id=button.dataset.id;

            const current=

            alerts.find(a=>a.id===id);

            if(!current) return;

            const title=

            prompt(

                "Edit alert title:",

                current.title

            );

            if(title===null) return;

            const message=

            prompt(

                "Edit alert message:",

                current.message

            );

            if(message===null) return;

            const level=

            prompt(

                "Alert Level (Emergency, Warning, Advisory)",

                current.level

            );

            if(level===null) return;

            await updateEmergencyAlert(id,{

                title:title.trim(),

                message:message.trim(),

                level:level.trim()

            });

            await loadAlerts();

        });

    });

    // ======================================
    // Delete Alert
    // ======================================

    document.querySelectorAll(".delete-alert")
    .forEach(button=>{

        button.addEventListener("click",async()=>{

            const confirmed=confirm(

                "Delete this emergency alert?"

            );

            if(!confirmed) return;

            await deleteEmergencyAlert(

                button.dataset.id

            );

            await loadAlerts();

        });

    });

}

// ======================================
// Start
// ======================================

loadAlerts();