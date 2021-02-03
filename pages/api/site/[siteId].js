import { getSiteDetails } from "@/lib/db-admin";

export default async (req, res) => {
  try {
    const { siteId } = req.query;
    const { site } = await getSiteDetails(siteId);
    res.status(200).json(site);
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ error: e.message });
  }
}