import { addDoc, collection, getDocs, getFirestore, query } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'
import { app, database } from './firebaseConfig';

export const caching = async () => {
    const q = query(collection(getFirestore(app), "cache"));
    let cache: any[] = []

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        cache.push(doc.data() as unknown as string)
        
      });
    console.log(cache[0].time)
    if (Date.now() - 36000 > cache[0].time) {
        getNewData()
    } else {
        getCacheData()
    }
    console.log(Date.now())

    

}

async function getNewData() {
    const q = query(collection(database, "bioData"));
    let biodata: any[] = []

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        biodata.push(doc.data() as unknown as string)
        
      });
// biodata



try {
    const docRef = await addDoc(collection(getFirestore(app), "bioData"), {
     
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  } 
}
function getCacheData() {
    console.log("You need new Old Data")
}

