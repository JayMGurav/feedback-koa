import firebase from './firebase-admin';

export async function getALlFeedback(siteId) {
  const snapshot = await firebase.collection('feedback').where('siteId', '==', siteId).get(), feedback = [];

  snapshot.forEach(doc => {
    feedback.push({ id: doc.id, ...doc.data() });
  });
  feedback.sort((a, b) => {
    return new Date(a.createdAt).getDate() >= new Date(b.createdAt).getDate()
  });
  // console.log(feedback);
  return feedback;
}


export async function getALlSites(siteId) {
  const snapshot = await firebase.collection('sites').get();
  const sites = [];
  snapshot.forEach(doc => {
    sites.push({ id: doc.id, ...doc.data() });
  });
  return sites;
}



