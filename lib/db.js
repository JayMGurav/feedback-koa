import firebase from "./firebase";
import { v4 as uuidv4 } from 'uuid';

const firestore = firebase.firestore()

export function createUser(uid, data) {
  return firestore.collection('users').doc(uid).set({
    uid,
    ...data
  }, { merge: true })
}


export async function createSite(data) {
  const site = await firestore.collection('sites').doc();
  const commentKey = uuidv4(), feedbackKey = uuidv4();
  const comment = await firestore.collection('comment').doc(commentKey)
  const feedback = await firestore.collection('feedback').doc(feedbackKey)
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
  feedback.set({
    siteId: site.id,
    siteOwnerId: data.ownerId,
    enabled: true,
    settings: {
      timestamp: true,
    }
  })

  site.set({ ...data, commentKey, feedbackKey, feedbackCount: 0, commentCount: 0 });
  return site;
}

export async function createComment(siteId, commentkey, data) {
  // check siteIT and comment key for ownership

  const addedData = await firestore.collection('comment').doc(commentkey).collection('siteComments').add(data);
  await firestore.collection('sites').doc(siteId).update({ commentCount: firebase.firestore.FieldValue.increment(1) }, { merge: true });
  return addedData;
}

export function deleteComment(siteId, commentkey, id) {
  // figure out to decrement commentCount in site
  return firestore.collection('comment').doc(commentkey).collection('siteComments').doc(id).update({ status: 'removed' });
}

export async function createFeedback(siteId, feedbackkey, data) {
  // check siteIT and comment key for ownership

  const addedData = await firestore.collection('feedback').doc(feedbackkey).collection('siteFeedbacks').add(data);
  await firestore.collection('sites').doc(siteId).update(
    { feedbackCount: firebase.firestore.FieldValue.increment(1) }, { merge: true }
  )
  return addedData;
}

export async function deleteFeedback(siteId, feedbackkey, id) {
  // figure out to decrement commentCount in site
  return await firestore.collection('feedback').doc(key).collection('siteFeedbacks').doc(id).delete();
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

// export function updateComment(key, id, newValue) {
//   return firestore.collection('comment').doc(key).collection('siteComments').doc(id).update(newValue);
// }

export function updateComment(key, newValue) {
  return firestore.collection('comment').doc(key).update(newValue);
}



export function updateSite(id, newValue) {
  return firestore.collection('sites').doc(id).update(newValue);
}