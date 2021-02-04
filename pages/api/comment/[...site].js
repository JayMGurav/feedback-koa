import { getAllComments, getCommentData, getSiteDetails } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

export default async function handler(req, res) {
  try {
    const [siteId, commentKey, route] = req.query.site;
    let comments = [], commentData = {};
    const site = await getSiteDetails(siteId);
    // console.log(site.commentKey == commentKey)
    if (site) {
      if (site.commentKey == commentKey) {
        commentData = await getCommentData(commentKey);
        comments = await getAllComments(commentKey, route);
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