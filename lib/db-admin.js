import { db } from './firebase-admin';

export async function getALlFeedback(siteId) {
  const snapshot = await db.collection('feedback').where('siteId', '==', siteId).get(), feedback = [];

  snapshot.forEach(doc => {
    feedback.push({ id: doc.id, ...doc.data() });
  });
  feedback.sort((a, b) => {
    return new Date(a.createdAt).getDate() >= new Date(b.createdAt).getDate()
  });
  // console.log(feedback);
  return feedback;
}


export async function getAllSites(siteId) {
  const snapshot = await db.collection('sites').get();
  const sites = [];
  snapshot.forEach(doc => {
    sites.push({ id: doc.id, ...doc.data() });
  });
  return sites;
}



export async function getUserSites(userId) {
  const snapshot = await db.collection('sites').where('ownerId', '==', userId).get();
  const sites = [];
  snapshot.forEach(doc => {
    sites.push({ id: doc.id, ...doc.data() });
  });
  return sites;
}



