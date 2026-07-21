import { db } from "../firebase.js";

import {

    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    serverTimestamp

}
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// ======================================
// Collection
// ======================================

const guidesRef =
collection(db,"safetyGuides");

// ======================================
// Create Guide
// ======================================

export async function createGuide(guide){

    await addDoc(

        guidesRef,

        {

            ...guide,

            createdAt:serverTimestamp()

        }

    );

}

// ======================================
// Get Guides
// ======================================

export async function getGuides(){

    const q=query(

        guidesRef,

        orderBy("createdAt","desc")

    );

    const snapshot=await getDocs(q);

    return snapshot.docs.map(doc=>({

        id:doc.id,

        ...doc.data()

    }));

}

// ======================================
// Update Guide
// ======================================

export async function updateGuide(id,data){

    await updateDoc(

        doc(db,"safetyGuides",id),

        data

    );

}

// ======================================
// Delete Guide
// ======================================

export async function deleteGuide(id){

    await deleteDoc(

        doc(db,"safetyGuides",id)

    );

}