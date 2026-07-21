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

const alertsRef =
collection(db,"emergencyAlerts");

// ======================================
// Create Alert
// ======================================

export async function createEmergencyAlert(alert){

    await addDoc(

        alertsRef,

        {

            ...alert,

            createdAt:serverTimestamp()

        }

    );

}

// ======================================
// Get All Alerts
// ======================================

export async function getEmergencyAlerts(){

    const q=query(

        alertsRef,

        orderBy("createdAt","desc")

    );

    const snapshot=await getDocs(q);

    return snapshot.docs.map(doc=>({

        id:doc.id,

        ...doc.data()

    }));

}

// ======================================
// Update Alert
// ======================================

export async function updateEmergencyAlert(id,data){

    await updateDoc(

        doc(db,"emergencyAlerts",id),

        data

    );

}

// ======================================
// Delete Alert
// ======================================

export async function deleteEmergencyAlert(id){

    await deleteDoc(

        doc(db,"emergencyAlerts",id)

    );

}