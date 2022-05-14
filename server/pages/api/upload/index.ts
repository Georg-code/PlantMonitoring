// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.headers.auth)
  console.log(process.env.AUTHKEY)
  if (req.headers.auth == process.env.AUTHKEY) {
    res.status(200).json({ "all": "good" })
  } else {

    res.status(401).json({ "not": "good" })
  }


}
