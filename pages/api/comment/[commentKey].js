import { getCommentData, } from "@/lib/db-admin";

export default async function handler(req, res) {
  try {
    const commentKey = req.query.commentKey;
    let commentData = {};
    commentData = await getCommentData(commentKey);
    res.setHeader('Content-Type', 'application/json');
    // console.log({ comments, site });
    res.status(200).json({ commentData });

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}