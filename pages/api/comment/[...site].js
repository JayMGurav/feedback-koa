import { getAllSiteComments, getCommentData, getSiteDetails } from "@/lib/db-admin";

export default async function handler(req, res) {
  try {
    // console.log(req.query)
    const [siteId, commentKey, route] = req.query.site;
    let comments = [], commentData = {};
    const site = await getSiteDetails(siteId);
    // console.log({ in: 'api', site })
    if (site.commentKey) {
      if (site.commentKey == commentKey) {
        commentData = await getCommentData(commentKey);
        comments = await getAllSiteComments(commentKey, route);
      } else {
        throw new Error(`invalid commentKey: ${commentKey}`);
      }
      res.setHeader('Content-Type', 'application/json');
      // console.log({ comments, site });
      res.status(200).json({ comments, site, commentData });
    } else {
      throw new Error(`Couldn't find site by id: ${siteId}`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}