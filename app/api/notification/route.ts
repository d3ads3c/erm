import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    // Store the token in your database
    console.log("Received token:", token);

    return res.status(200).json({ message: "Token stored successfully" });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}