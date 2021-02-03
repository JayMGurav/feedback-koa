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

export function createComment(data) {
  return firestore.collection('comment').add(data);
}

export function deleteComment(id) {
  return firestore.collection('comment').doc(id).update({ status: 'removed' });
}


export async function deleteSite(id) {
  firestore.collection('sites').doc(id).delete();
  const snapshot = await firestore
    .collection('comment')
    .where('siteId', '==', id)
    .get();

  const batch = firestore.batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}

export function updateComment(id, newValue) {
  return firestore.collection('comment').doc(id).update(newValue);
}

export function updateSite(id, newValue) {
  return firestore.collection('sites').doc(id).update(newValue);
} 