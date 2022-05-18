// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'
import { app, database } from './firebaseConfig';
type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const q = query(collection(getFirestore(app), "bioData"));
    let biodata: any[] = []

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
        biodata.push(doc.data() as unknown as string)
        
      });
      console.log(biodata)
      res.json(JSON.parse(JSON.stringify(biodata)))
}
