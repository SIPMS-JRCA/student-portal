// ======================================
// Get Hazard from URL
// ======================================

const params = new URLSearchParams(window.location.search);

const hazard = params.get("hazard") || "fire";

// ======================================
// Safety Guide Data
// ======================================

const guides = {

    fire: {

        title: "🔥 Fire Safety",

        description:
            "Learn the proper evacuation procedures during a fire emergency.",

        before: [

            "Know the nearest emergency exit.",

            "Locate the nearest fire extinguisher.",

            "Participate in school fire drills.",

            "Stay familiar with your classroom evacuation route."

        ],

        during: [

            "Stay calm and do not panic.",

            "Activate the nearest fire alarm if safe.",

            "Follow the designated evacuation route.",

            "Never use elevators during a fire.",

            "Proceed directly to the assembly area."

        ],

        after: [

            "Remain in the assembly area.",

            "Wait for further instructions.",

            "Never re-enter the building until authorized."

        ]

    },

    earthquake: {

        title: "🌎 Earthquake Safety",

        description:
            "Know what to do before, during, and after an earthquake.",

        before: [

            "Identify safe places inside classrooms.",

            "Know your evacuation route.",

            "Participate in earthquake drills."

        ],

        during: [

            "DROP.",

            "COVER.",

            "HOLD ON.",

            "Stay away from windows."

        ],

        after: [

            "Evacuate calmly.",

            "Watch for falling debris.",

            "Proceed to the designated assembly area."

        ]

    },

    flood: {

        title: "🌧 Flood Safety",

        description:
            "Stay prepared before, during, and after flooding.",

        before: [

            "Monitor weather updates.",

            "Know higher evacuation areas.",

            "Prepare emergency supplies."

        ],

        during: [

            "Move to higher floors if instructed.",

            "Avoid walking through floodwater.",

            "Listen to school authorities."

        ],

        after: [

            "Return only when declared safe.",

            "Avoid damaged electrical equipment.",

            "Report hazards immediately."

        ]

    },

    typhoon: {

        title: "🌀 Typhoon Safety",

        description:
            "Stay safe during strong winds and heavy rainfall.",

        before: [

            "Secure loose belongings.",

            "Monitor weather bulletins.",

            "Charge emergency devices."

        ],

        during: [

            "Stay indoors.",

            "Keep away from glass windows.",

            "Follow school announcements."

        ],

        after: [

            "Beware of fallen trees and power lines.",

            "Wait for the official all-clear.",

            "Report damaged facilities."

        ]

    }

};

// ======================================
// Display Guide Information
// ======================================

const guide = guides[hazard];

document.getElementById("guideTitle").textContent =
guide.title;

document.getElementById("guideDescription").textContent =
guide.description;

// ======================================
// Populate Lists
// ======================================

function fillList(id, items) {

    const list = document.getElementById(id);

    list.innerHTML = "";

    items.forEach(item => {

        list.innerHTML += `<li>${item}</li>`;

    });

}

fillList("beforeList", guide.before);

fillList("duringList", guide.during);

fillList("afterList", guide.after);

// ======================================
// Building & Floor
// ======================================

const building =
document.getElementById("building");

const floor =
document.getElementById("floor");

function updateMapInfo() {

    const buildingName =

        building.value === "main"

        ? "Main Building"

        : "Annex Building";

    const floorNames = {

        1:"Ground Floor",

        2:"2nd Floor",

        3:"3rd Floor",

        4:"4th Floor",

        5:"5th Floor",

        6:"6th Floor",

        7:"7th Floor"

    };

    document.getElementById("mapTitle").textContent =
    guide.title;

    document.getElementById("mapLocation").textContent =

    `${buildingName} • ${floorNames[floor.value]}`;

    const imagePath =

    `images/maps/${hazard}/${building.value}/${floor.value}.png`;

    const map =
    document.getElementById("evacuationMap");

    map.src = imagePath;

    map.onerror = function(){

        this.src = "images/maps/placeholder.png";

        document.getElementById("mapStatus").textContent =

        "Official evacuation map has not been uploaded yet.";

    };

    map.onload = function(){

        document.getElementById("mapStatus").textContent =

        "Official evacuation map";

    };

}

building.addEventListener("change", updateMapInfo);

floor.addEventListener("change", updateMapInfo);

updateMapInfo();