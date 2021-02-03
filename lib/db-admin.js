import { db } from './firebase-admin';

// export async function getAllFeedback(siteId) {
//   const snapshot = await db.collection('comment')
//     .where('siteId', '==', siteId)
//     .where('status', 'in', ['pending', 'active']).get();
//   const comment = [];

//   snapshot.forEach(doc => {
//     comment.push({ id: doc.id, ...doc.data() });
//   });
//   comment.sort((a, b) => {
//     return new Date(a.createdAt).getDate() >= new Date(b.createdAt).getDate()
//   });
//   // console.log(comment);
//   return comment;
// }
export async function getAllComments(siteId, route) {
  // try {
  const ref = db
    .collection('comment')
    .where('siteId', '==', siteId)
    .where('status', '==', 'active');

  if (route) {
    ref = ref.where('route', '==', route);
  }

  const snapshot = await ref.get();
  const comments = [];

  snapshot.forEach(doc => {
    comments.push({ id: doc.id, ...doc.data() });
  });

  comments.sort((a, b) => {
    return new Date(a.createdAt).getDate() >= new Date(b.createdAt).getDate()
  });
  // console.log(comment);
  return comments;
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
  // console.log({ sites });
  return sites;
}


export async function getUserComments(userId) {
  const snapshot = await db.collection('comment')
    .where('authorId', '==', userId)
    .where('status', 'in', ['pending', 'active'])
    .get();
  const feedbacks = [];
  snapshot.forEach(doc => {
    feedbacks.push({ id: doc.id, ...doc.data() });
  });
  return feedbacks;
}


export async function getAllCommentsForSites(uid) {
  const sites = await getUserSites(uid);

  // console.log({ sites });
  if (!sites.length) {
    return [];
  }

  const siteIds = sites.map((site) => site.id);
  const snapshot = await db
    .collection('comment')
    .where('siteId', 'in', siteIds)
    .get();

  const comments = [];

  snapshot.forEach((doc) => {
    comments.push({ id: doc.id, ...doc.data() });
  });

  return comments;
}
