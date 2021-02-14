import { getAllSiteFeedbacks, getSiteDetails } from "@/lib/db-admin";

export default async function handler(req, res) {
  try {
    const [siteId, feedbackKey, route] = req.query.site;
    let feedbacks = [];
    const site = await getSiteDetails(siteId);
    if (site.feedbackKey) {
      if (site.feedbackKey == feedbackKey) {
        feedbacks = await getAllSiteFeedbacks(feedbackKey, route);
      } else {
        throw new Error(`invalid feedbackKey: ${feedbackKey}`);
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ feedbacks, site });
    } else {
      throw new Error(`Couldn't find site by id: ${siteId}`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}