import { getAllFeedback, getSiteDetails } from "@/lib/db-admin";

export default async function handler(req, res) {
  const siteId = req.query.siteId;
  const feedback = await getAllFeedback(siteId);
  const site = await getSiteDetails(siteId);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ feedback, site });
}