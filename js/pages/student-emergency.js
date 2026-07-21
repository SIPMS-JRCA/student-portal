import {

    getEmergencyAlerts

}
from "../services/emergencyService.js";

// ======================================
// Elements
// ======================================

const alertList =
document.getElementById("studentAlertList");

// ======================================

let alerts=[];

// ======================================
// Load Alerts
// ======================================

async function loadAlerts(){

    alerts =
    await getEmergencyAlerts();

    renderAlerts();

}

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

                There are currently no emergency alerts.

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

                <div class="alert-title">

                    ${alert.title}

                </div>

                <span class="alert-level ${badge}">

                    ${alert.level}

                </span>

            </div>

            <div class="alert-message">

                ${alert.message}

            </div>

            <div class="alert-date">

                Posted:

                ${date}

            </div>

        </div>

        `;

    });

}

// ======================================
// Start
// ======================================

loadAlerts();