// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { app, database } from './firebaseConfig';


import sqlite3 from 'sqlite3'
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  // I know this is not secure but I don't care
    if (req.headers['x-auth'] == process.env.APIKEY) {
       console.log(JSON.parse(req.body))
       
        try {
            const docRef = await addDoc(collection(getFirestore(app), "bioData"), {
              time: Date.now(),
              level: parseInt(JSON.parse(req.body)) ?? null,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          } 
          res.status(200).destroy()
    } else {
        res.status(401).destroy()
    }
}
export const config = {
    api: {
      bodyParser: {
        sizeLimit: '1mb',
      },
    },
  }
  