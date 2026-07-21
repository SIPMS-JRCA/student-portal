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

const weatherRef =
collection(db,"weatherAdvisories");

// ======================================
// Create Weather Advisory
// ======================================

export async function createWeather(weather){

    await addDoc(

        weatherRef,

        {

            ...weather,

            createdAt:serverTimestamp()

        }

    );

}

// ======================================
// Get Weather Advisories
// ======================================

export async function getWeather(){

    const q=query(

        weatherRef,

        orderBy("createdAt","desc")

    );

    const snapshot=await getDocs(q);

    return snapshot.docs.map(doc=>({

        id:doc.id,

        ...doc.data()

    }));

}

// ======================================
// Update Weather Advisory
// ======================================

export async function updateWeather(id,data){

    await updateDoc(

        doc(db,"weatherAdvisories",id),

        data

    );

}

// ======================================
// Delete Weather Advisory
// ======================================

export async function deleteWeather(id){

    await deleteDoc(

        doc(db,"weatherAdvisories",id)

    );

}