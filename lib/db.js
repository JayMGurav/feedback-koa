import firebase from "./firebase";

const firestore = firebase.firestore()

export function createUser(uid, data) {
  return firestore.collection('users').doc(uid).set({
    uid,
    ...data
  }, { merge: true })
}


export function createSite(data) {
  const site = firestore.collection('sites').doc();
  site.set(data);
  return site;
}

export function createFeedback(data) {
  return firestore.collection('feedback').add(data);
}

export function deleteFeedback(id) {
  return firestore.collection('feedback').doc(id).update({ status: 'removed' });
}


export async function deleteSite(id) {
  firestore.collection('sites').doc(id).delete();
  const snapshot = await firestore
    .collection('feedback')
    .where('siteId', '==', id)
    .get();

  const batch = firestore.batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}

export function updateFeedback(id, newValue) {
  return firestore.collection('feedback').doc(id).update(newValue);
}

export function updateSite(id, newValue) {
  return firestore.collection('sites').doc(id).update(newValue);
}