import { protectAdminPage } from "../components/adminGuard.js";

import {

    getAllReports,
    updateIncidentStatus,
    deleteIncidentReport

} from "../services/incidentReportService.js";

protectAdminPage();

// ==========================================
// Elements
// ==========================================

const reportsContainer =
document.getElementById("reportsContainer");

const searchInput =
document.getElementById("searchReport");

const statusFilter =
document.getElementById("statusFilter");

let reports = [];

// ==========================================
// Load Reports
// ==========================================

async function loadReports(){

    reports =
    await getAllReports();

    renderReports();

}

// ==========================================
// Search + Filter
// ==========================================

searchInput.addEventListener("input",renderReports);

statusFilter.addEventListener("change",renderReports);

// ==========================================
// Render Reports
// ==========================================

function renderReports(){

    const keyword =
    searchInput.value
    .toLowerCase()
    .trim();

    const filter =
    statusFilter.value;

    const filtered =
    reports.filter(report=>{

        const matchesSearch =

            report.username
            ?.toLowerCase()
            .includes(keyword)

            ||

            report.incidentType
            ?.toLowerCase()
            .includes(keyword)

            ||

            report.location
            ?.toLowerCase()
            .includes(keyword);

        const matchesStatus =

            filter==="All"

            ||

            report.status===filter;

        return matchesSearch && matchesStatus;

    });

    if(filtered.length===0){

        reportsContainer.innerHTML=`

            <div class="empty">

                <i class="fa-solid fa-file-circle-exclamation"
                   style="font-size:70px;color:#CBD5E1;margin-bottom:20px;">
                </i>

                <h2>

                    No Incident Reports

                </h2>

                <p>

                    There are no reports matching your search.

                </p>

            </div>

        `;

        return;

    }

    reportsContainer.innerHTML="";

    filtered.forEach(report=>{

        let statusClass = report.status;

        const date =

        report.createdAt

        ?

        report.createdAt
        .toDate()
        .toLocaleString()

        :

        "";

        reportsContainer.innerHTML += `

        <div class="report-card">

            <div class="report-header">

                <div class="report-title">

                    <i class="fa-solid fa-file-circle-exclamation"></i>

                    <div>

                        <h3>

                            ${report.incidentType}

                        </h3>

                        <small>

                            ${date}

                        </small>

                    </div>

                </div>

                <span class="status ${statusClass}">

                    ${report.status}

                </span>

            </div>

            <div class="report-grid">

                <div class="report-info">

                    <small>

                        Student

                    </small>

                    <strong>

                        ${report.username}

                    </strong>

                </div>

                <div class="report-info">

                    <small>

                        Email

                    </small>

                    <strong>

                        ${report.email}

                    </strong>

                </div>

                <div class="report-info">

                    <small>

                        Location

                    </small>

                    <strong>

                        ${report.location}

                    </strong>

                </div>

            </div>

            <div class="report-description">

                ${report.description}

            </div>

             <div class="action-bar">

                <button
                    class="pending-btn"
                    data-id="${report.id}">

                    <i class="fa-solid fa-spinner"></i>

                    Investigating

                </button>

                <button
                    class="resolve-btn"
                    data-id="${report.id}">

                    <i class="fa-solid fa-circle-check"></i>

                    Resolved

                </button>

                <button
                    class="delete-btn"
                    data-id="${report.id}">

                    <i class="fa-solid fa-trash"></i>

                    Delete

                </button>

            </div>

        </div>

        `;

    });

    // ==========================================
    // Investigating
    // ==========================================

    document.querySelectorAll(".pending-btn")
    .forEach(button=>{

        button.addEventListener("click",async()=>{

            await updateIncidentStatus(

                button.dataset.id,

                "Investigating"

            );

            await loadReports();

        });

    });

    // ==========================================
    // Resolved
    // ==========================================

    document.querySelectorAll(".resolve-btn")
    .forEach(button=>{

        button.addEventListener("click",async()=>{

            await updateIncidentStatus(

                button.dataset.id,

                "Resolved"

            );

            await loadReports();

        });

    });

    // ==========================================
    // Delete
    // ==========================================

    document.querySelectorAll(".delete-btn")
    .forEach(button=>{

        button.addEventListener("click",async()=>{

            const confirmed = confirm(

                "Delete this incident report?"

            );

            if(!confirmed) return;

            await deleteIncidentReport(

                button.dataset.id

            );

            await loadReports();

        });

    });

}

// ==========================================
// Start
// ==========================================

loadReports();