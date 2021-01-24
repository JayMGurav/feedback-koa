import { getALlSites } from "@/lib/db-admin";

export default async function (_, res) {
  const sites = await getALlSites();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ sites });
}