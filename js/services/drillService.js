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

const drillsRef =
collection(db,"drillSchedules");

// ======================================
// Create Drill
// ======================================

export async function createDrill(drill){

    await addDoc(

        drillsRef,

        {

            ...drill,

            createdAt:serverTimestamp()

        }

    );

}

// ======================================
// Get Drills
// ======================================

export async function getDrills(){

    const q=query(

        drillsRef,

        orderBy("createdAt","desc")

    );

    const snapshot=await getDocs(q);

    return snapshot.docs.map(doc=>({

        id:doc.id,

        ...doc.data()

    }));

}

// ======================================
// Update Drill
// ======================================

export async function updateDrill(id,data){

    await updateDoc(

        doc(db,"drillSchedules",id),

        data

    );

}

// ======================================
// Delete Drill
// ======================================

export async function deleteDrill(id){

    await deleteDoc(

        doc(db,"drillSchedules",id)

    );

}