import { protectAdminPage } from "../components/adminGuard.js";

import {

    createGuide,
    getGuides,
    updateGuide,
    deleteGuide

}
from "../services/guideService.js";

protectAdminPage();

// ======================================
// Elements
// ======================================

const titleInput =
document.getElementById("guideTitle");

const contentInput =
document.getElementById("guideContent");

const categoryInput =
document.getElementById("guideCategory");

const postBtn =
document.getElementById("postGuideBtn");

const guideList =
document.getElementById("guideList");

// ======================================

let guides=[];

// ======================================
// Load Guides
// ======================================

async function loadGuides(){

    guides =
    await getGuides();

    renderGuides();

}

// ======================================
// Create Guide
// ======================================

postBtn.addEventListener("click",async()=>{

    const title=
    titleInput.value.trim();

    const content=
    contentInput.value.trim();

    const category=
    categoryInput.value;

    if(title==="" || content===""){

        alert("Please complete all fields.");

        return;

    }

    await createGuide({

        title,

        content,

        category

    });

    titleInput.value="";

    contentInput.value="";

    categoryInput.value="Fire Safety";

    await loadGuides();

});

// ======================================
// Render Guides
// ======================================

function renderGuides(){

    if(guides.length===0){

        guideList.innerHTML=`

        <div class="empty-guides">

            <i class="fa-solid fa-book-open"></i>

            <h2>

                No Safety Guides

            </h2>

            <p>

                Publish your first safety guide.

            </p>

        </div>

        `;

        return;

    }

    guideList.innerHTML="";

    guides.forEach(guide=>{

        const date=

        guide.createdAt

        ?

        guide.createdAt.toDate().toLocaleString()

        :

        "";

        guideList.innerHTML+=`

        <div class="guide-card">

            <div class="guide-header">

                <div class="guide-title">

                    ${guide.title}

                </div>

                <span class="guide-category">

                    ${guide.category}

                </span>

            </div>

            <div class="guide-content">

                ${guide.content}

            </div>

            <div class="guide-footer">

                <div class="guide-date">

                    ${date}

                </div>

                <div class="guide-actions">

                    <button
                    class="edit-guide"
                    data-id="${guide.id}">

                        <i class="fa-solid fa-pen"></i>

                        Edit

                    </button>

                    <button
                    class="delete-guide"
                    data-id="${guide.id}">

                        <i class="fa-solid fa-trash"></i>

                        Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    // ======================================
    // Edit Guide
    // ======================================

    document.querySelectorAll(".edit-guide")
    .forEach(button=>{

        button.addEventListener("click",async()=>{

            const id=button.dataset.id;

            const current=

            guides.find(g=>g.id===id);

            if(!current) return;

            const title=

            prompt(

                "Edit guide title:",

                current.title

            );

            if(title===null) return;

            const content=

            prompt(

                "Edit guide content:",

                current.content

            );

            if(content===null) return;

            const category=

            prompt(

                "Category (Fire Safety, Earthquake, Flood, Typhoon, First Aid, General Safety)",

                current.category

            );

            if(category===null) return;

            await updateGuide(id,{

                title:title.trim(),

                content:content.trim(),

                category:category.trim()

            });

            await loadGuides();

        });

    });

    // ======================================
    // Delete Guide
    // ======================================

    document.querySelectorAll(".delete-guide")
    .forEach(button=>{

        button.addEventListener("click",async()=>{

            const confirmed=confirm(

                "Delete this safety guide?"

            );

            if(!confirmed) return;

            await deleteGuide(

                button.dataset.id

            );

            await loadGuides();

        });

    });

}

// ======================================
// Start
// ======================================

loadGuides();