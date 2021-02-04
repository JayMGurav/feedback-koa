import firebase from "./firebase";
import { v4 as uuidv4 } from 'uuid';

const firestore = firebase.firestore()

export function createUser(uid, data) {
  return firestore.collection('users').doc(uid).set({
    uid,
    ...data
  }, { merge: true })
}


export function createSite(data) {
  const site = firestore.collection('sites').doc();
  const commentKey = uuidv4();
  const comment = firestore.collection('comment').doc(commentKey)
  comment.set({
    siteId: site.id,
    siteOwnerId: data.ownerId,
    enabled: true,
    settings: {
      authentication: false,
      icons: true,
      timestamp: true,
      ratings: false
    }
  })
  site.set({ ...data, commentKey });
  return site;
}

export function createComment(key, data) {
  return firestore.collection('comment').doc(key).collection('siteComments').add(data);
}

export function deleteComment(key, id) {
  return firestore.collection('comment').doc(key).collection('siteComments').doc(id).update({ status: 'removed' });
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

export function updateComment(key, id, newValue) {
  return firestore.collection('comment').doc(key).collection('siteComments').doc(id).update(newValue);
}

export function updateSite(id, newValue) {
  return firestore.collection('sites').doc(id).update(newValue);
} 