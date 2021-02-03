import { db } from './firebase-admin';

// export async function getAllFeedback(siteId) {
//   const snapshot = await db.collection('feedback')
//     .where('siteId', '==', siteId)
//     .where('status', 'in', ['pending', 'active']).get();
//   const feedback = [];

//   snapshot.forEach(doc => {
//     feedback.push({ id: doc.id, ...doc.data() });
//   });
//   feedback.sort((a, b) => {
//     return new Date(a.createdAt).getDate() >= new Date(b.createdAt).getDate()
//   });
//   // console.log(feedback);
//   return feedback;
// }
export async function getAllFeedback(siteId, route) {
  // try {
  const ref = db
    .collection('feedback')
    .where('siteId', '==', siteId)
    .where('status', '==', 'active');

  if (route) {
    ref = ref.where('route', '==', route);
  }

  const snapshot = await ref.get();
  const feedback = [];

  snapshot.forEach(doc => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  feedback.sort((a, b) => {
    return new Date(a.createdAt).getDate() >= new Date(b.createdAt).getDate()
  });
  // console.log(feedback);
  return feedback;
  // } catch (error) {
  //   console.log(error.message);
  // }
}


export async function getAllSites() {
  const snapshot = await db.collection('sites').get();
  const sites = [];
  snapshot.forEach(doc => {
    sites.push({ id: doc.id, ...doc.data() });
  });
  return sites;
}

export async function getSiteDetails(siteId) {
  const doc = await db.collection('sites').doc(siteId).get();
  const site = { id: doc.id, ...doc.data() };
  return site;
}



export async function getUserSites(userId) {
  const snapshot = await db.collection('sites').where('ownerId', '==', userId).get();
  const sites = [];
  snapshot.forEach(doc => {
    sites.push({ id: doc.id, ...doc.data() });
  });
  return sites;
}


export async function getUserFeedback(userId) {
  const snapshot = await db.collection('feedback')
    .where('authorId', '==', userId)
    .where('status', 'in', ['pending', 'active'])
    .get();
  const feedbacks = [];
  snapshot.forEach(doc => {
    feedbacks.push({ id: doc.id, ...doc.data() });
  });
  return feedbacks;
}


export async function getAllFeedbackForSites(uid) {
  const { sites } = await getUserSites(uid);

  if (!sites.length) {
    return [];
  }

  const siteIds = sites.map((site) => site.id);
  const snapshot = await db
    .collection('feedback')
    .where('siteId', 'in', siteIds)
    .get();

  const feedback = [];

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return feedback;
}
