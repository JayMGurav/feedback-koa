import { getUserFeedback } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

export default async function (req, res) {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token)
    const feedbacks = await getUserFeedback(uid);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ feedbacks });
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}