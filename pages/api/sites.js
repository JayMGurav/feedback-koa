import db from "@/lib/firebase-admin";

export default async function handler(req, res) {
  const siteRef = db.collection('sites');
  const snapshot = await siteRef.get();
  const sites = [];
  snapshot.forEach(doc => {
    sites.push({ id: doc.id, ...doc.data() });
  });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ sites });
}