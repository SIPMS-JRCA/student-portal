export function loadAdminSidebar(activePage) {

    const sidebar = document.querySelector(".sidebar");

    sidebar.innerHTML = `

        <div class="sidebar-header">

            <h2>SIPMS</h2>

            <span>Administrator</span>

        </div>

        <div class="sidebar-menu-wrapper">

            <ul class="sidebar-menu">

                <li class="${activePage==="dashboard"?"active":""}"
                    onclick="location.href='admin-dashboard.html'">
                    <i class="fa-solid fa-house"></i>
                    <span>Dashboard</span>
                </li>

                <li class="${activePage==="announcements"?"active":""}"
                    onclick="location.href='admin-announcement.html'">
                    <i class="fa-solid fa-bullhorn"></i>
                    <span>Announcements</span>
                </li>

                <li class="${activePage==="users"?"active":""}"
                    onclick="location.href='admin-users.html'">
                    <i class="fa-solid fa-users"></i>
                    <span>User Management</span>
                </li>

                <li class="${activePage==="incidents"?"active":""}"
                    onclick="location.href='admin-incidents.html'">
                    <i class="fa-solid fa-file-circle-exclamation"></i>
                    <span>Incident Reports</span>
                </li>

                <li class="${activePage==="emergency"?"active":""}"
                    onclick="location.href='admin-emergency.html'">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <span>Emergency Alerts</span>
                </li>

                <li class="${activePage==="drills"?"active":""}"
                    onclick="location.href='admin-drills.html'">
                    <i class="fa-solid fa-person-running"></i>
                    <span>Drill Schedules</span>
                </li>

                <li class="${activePage==="weather"?"active":""}"
                    onclick="location.href='admin-weather.html'">
                    <i class="fa-solid fa-cloud-sun-rain"></i>
                    <span>Weather Advisories</span>
                </li>

                <li class="${activePage==="guides"?"active":""}"
                    onclick="location.href='admin-guides.html'">
                    <i class="fa-solid fa-book-open"></i>
                    <span>Safety Guides</span>
                </li>

                <li class="${activePage==="evacuation"?"active":""}"
                    onclick="location.href='admin-evacuation.html'">
                    <i class="fa-solid fa-map-location-dot"></i>
                    <span>Evacuation Maps</span>
                </li>

                <li class="${activePage==="profile"?"active":""}"
                    onclick="location.href='admin-profile.html'">
                    <i class="fa-solid fa-user"></i>
                    <span>Profile</span>
                </li>

            </ul>

        </div>

        <div class="sidebar-footer">

            SIPMS v2.0

        </div>

    `;

    const menuBtn = document.getElementById("menuBtn");

    if (menuBtn) {

        menuBtn.addEventListener("click", (e) => {

            e.stopPropagation();

            sidebar.classList.toggle("open");

        });

    }

    document.addEventListener("click", (e) => {

        if (window.innerWidth <= 768) {

            if (
                !sidebar.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {

                sidebar.classList.remove("open");

            }

        }

    });

}

window.closeSidebar = function () {

    document.querySelector(".sidebar").classList.remove("open");

};