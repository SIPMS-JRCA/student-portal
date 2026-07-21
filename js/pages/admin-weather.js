import { protectAdminPage } from "../components/adminGuard.js";

import {

    createWeather,
    getWeather,
    updateWeather,
    deleteWeather

}
from "../services/weatherService.js";

protectAdminPage();

// ======================================
// Elements
// ======================================

const titleInput =
document.getElementById("weatherTitle");

const messageInput =
document.getElementById("weatherMessage");

const levelInput =
document.getElementById("weatherLevel");

const postBtn =
document.getElementById("postWeatherBtn");

const weatherList =
document.getElementById("weatherList");

// ======================================

let advisories=[];

// ======================================
// Load Advisories
// ======================================

async function loadWeather(){

    advisories =
    await getWeather();

    renderWeather();

}

// ======================================
// Create Advisory
// ======================================

postBtn.addEventListener("click",async()=>{

    const title=
    titleInput.value.trim();

    const message=
    messageInput.value.trim();

    const level=
    levelInput.value;

    if(title==="" || message===""){

        alert("Please complete all fields.");

        return;

    }

    await createWeather({

        title,

        message,

        level

    });

    titleInput.value="";

    messageInput.value="";

    levelInput.value="Information";

    await loadWeather();

});

// ======================================
// Render Advisories
// ======================================

function renderWeather(){

    if(advisories.length===0){

        weatherList.innerHTML=`

        <div class="empty-weather">

            <i class="fa-solid fa-cloud-sun-rain"></i>

            <h2>

                No Weather Advisories

            </h2>

            <p>

                Create your first weather advisory.

            </p>

        </div>

        `;

        return;

    }

    weatherList.innerHTML="";

    advisories.forEach(item=>{

        let badge="level-information";

        if(item.level==="Heavy Rain"){

            badge="level-rain";

        }

        else if(item.level==="Typhoon"){

            badge="level-typhoon";

        }

        else if(item.level==="Flood"){

            badge="level-flood";

        }

        else if(item.level==="Extreme Heat"){

            badge="level-heat";

        }

        const date=

        item.createdAt

        ?

        item.createdAt.toDate().toLocaleString()

        :

        "";

        weatherList.innerHTML+=`

        <div class="weather-card">

            <div class="weather-header">

                <div class="weather-title">

                    ${item.title}

                </div>

                <span class="weather-level ${badge}">

                    ${item.level}

                </span>

            </div>

            <div class="weather-message">

                ${item.message}

            </div>

            <div class="weather-footer">

                <div class="weather-date">

                    ${date}

                </div>

                <div class="weather-actions">

                    <button
                        class="edit-weather"
                        data-id="${item.id}">

                        <i class="fa-solid fa-pen"></i>

                        Edit

                    </button>

                    <button
                        class="delete-weather"
                        data-id="${item.id}">

                        <i class="fa-solid fa-trash"></i>

                        Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    // ======================================
    // Edit Weather Advisory
    // ======================================

    document.querySelectorAll(".edit-weather")
    .forEach(button=>{

        button.addEventListener("click",async()=>{

            const id=button.dataset.id;

            const current=

            advisories.find(a=>a.id===id);

            if(!current) return;

            const title=

            prompt(

                "Edit advisory title:",

                current.title

            );

            if(title===null) return;

            const message=

            prompt(

                "Edit advisory message:",

                current.message

            );

            if(message===null) return;

            const level=

            prompt(

                "Level (Information, Heavy Rain, Typhoon, Flood, Extreme Heat)",

                current.level

            );

            if(level===null) return;

            await updateWeather(id,{

                title:title.trim(),

                message:message.trim(),

                level:level.trim()

            });

            await loadWeather();

        });

    });

    // ======================================
    // Delete Weather Advisory
    // ======================================

    document.querySelectorAll(".delete-weather")
    .forEach(button=>{

        button.addEventListener("click",async()=>{

            const confirmed=confirm(

                "Delete this weather advisory?"

            );

            if(!confirmed) return;

            await deleteWeather(

                button.dataset.id

            );

            await loadWeather();

        });

    });

}

// ======================================
// Start
// ======================================

loadWeather();