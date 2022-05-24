// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, getDocFromCache, getDocs, getDocsFromCache, getFirestore, orderBy, query } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'
import { caching } from './caching';
import { app, database } from './firebaseConfig';
type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    
    const q = query(collection(database, "bioData"), orderBy("time", "desc"));
    let biodata: any[] = []

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
        console.log(doc.data());
        biodata.push(doc.data() as unknown as string)
        
      });
      res.json(JSON.parse(JSON.stringify(biodata)))
      
     
       
     
}
