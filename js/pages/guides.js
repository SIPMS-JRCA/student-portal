const guides = [

    {
        hazard: "fire",
        icon: "🔥",
        title: "Fire Safety",
        level: "HIGH RISK",
        color: "#dc3545",
        description:
        "Learn the proper evacuation procedures during a fire emergency."
    },

    {
        hazard: "earthquake",
        icon: "🌎",
        title: "Earthquake Safety",
        level: "HIGH RISK",
        color: "#fd7e14",
        description:
        "Drop, Cover, and Hold. Learn earthquake evacuation procedures."
    },

    {
        hazard: "flood",
        icon: "🌧",
        title: "Flood Safety",
        level: "MODERATE",
        color: "#0d6efd",
        description:
        "Stay safe before, during, and after flooding."
    },

    {
        hazard: "typhoon",
        icon: "🌀",
        title: "Typhoon Safety",
        level: "HIGH ALERT",
        color: "#6f42c1",
        description:
        "Prepare for strong winds and severe weather."
    }

];

const container =
document.getElementById("guidesContainer");

let html = "";

guides.forEach(guide => {

    html += `

    <div
        class="guide-card"
        style="border-left:8px solid ${guide.color};">

        <div class="guide-icon">

            ${guide.icon}

        </div>

        <div class="guide-info">

            <h2>

                ${guide.title}

            </h2>

            <span
                class="risk-badge"
                style="background:${guide.color};">

                ${guide.level}

            </span>

            <p>

                ${guide.description}

            </p>

            <button
            onclick="location.href='guide-details.html?hazard=${guide.hazard}'">

                View Guide

            </button>

        </div>

    </div>

    `;

});

container.innerHTML = html;