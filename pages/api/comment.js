import { getAllCommentsForSites } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

export default async function (req, res) {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    // todo
    // const comments = await getAllCommentsForSites(uid);
    const comments = [];
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}