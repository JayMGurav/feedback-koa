import { getAllComments, getSiteDetails } from "@/lib/db-admin";

export default async function handler(req, res) {
  try {
    const [siteId, route] = req.query.site;
    const comments = await getAllComments(siteId, route);
    const site = await getSiteDetails(siteId);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ comments, site });
  } catch (error) {
    res.status(200).json({ error: error.message })
  }
}