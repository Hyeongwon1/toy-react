// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const date = new Date();
  res.status(200).json({ name: "John Doe" ,time : date.toLocaleString()});
}
