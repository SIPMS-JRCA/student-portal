import { protectStudentPage } from "../components/studentGuard.js";

import {

    getWeather

}
from "../services/weatherService.js";

protectStudentPage();

// ======================================
// Elements
// ======================================

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

                There are currently no weather advisories.

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

            </div>

        </div>

        `;

    });

}
    
// ======================================
// Start
// ======================================

loadWeather();