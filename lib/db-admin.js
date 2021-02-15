import { db } from './firebase-admin';



//     .where('status', 'in', ['pending', 'active']).get();

export async function getAllComments(uid) {
  const ref = db.collection('comment').where('siteOwnerId', '==', uid);
  const snapshot = await ref.get();
  const allComments = [];

  snapshot.forEach(doc => {
    allComments.push({ id: doc.id, ...doc.data() });
  });
  return allComments;
}


export async function getAllSiteComments(commentKey, route) {
  // try {
  // console.log({ commentKey })
  let ref = db
    .collection('comment').doc(commentKey).collection('siteComments')
    .where('status', '==', 'active');
  // .where('siteId', '==', siteId)

  if (route) {
    if (route !== 'allcomments') {
      ref = ref.where('route', '==', route);
    }
  } else {
    ref = ref.where('route', '==', '/');
  }

  const snapshot = await ref.get();
  const comments = [];

  snapshot.forEach(doc => {
    comments.push({ id: doc.id, ...doc.data() });
  });

  comments.sort((a, b) => {
    return Date.parse(a.createdAt) - Date.parse(b.createdAt);
  }).reverse();
  // console.log(JSON.stringify(comments, null, 2));
  return comments;
}


export async function getAllSiteFeedbacks(feedbackKey, route) {
  // try {
  // console.log({ commentKey })
  let ref = db
    .collection('feedback').doc(feedbackKey).collection('siteFeedbacks');

  if (route) {
    if (route !== 'allfeedbacks') {
      ref = ref.where('route', '==', route);
    }
  } else {
    ref = ref.where('route', '==', '/');
  }

  const snapshot = await ref.get();
  const feedbacks = [];

  snapshot.forEach(doc => {
    feedbacks.push({ id: doc.id, ...doc.data() });
  });

  feedbacks.sort((a, b) => {
    return Date.parse(a.createdAt) - Date.parse(b.createdAt);
  }).reverse();
  // console.log(JSON.stringify(comments, null, 2));
  return feedbacks;
}




export async function getCommentData(commentKey) {
  const doc = await db.collection('comment').doc(commentKey).get()
  const commentData = { id: doc.id, ...doc.data() }
  // console.log(commentData);
  return commentData;
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

// todo
export async function getUserComments(userId) {
  //   const snapshot = await db.collection('comment')
  //     .where('authorId', '==', userId)
  //     .where('status', 'in', ['pending', 'active'])
  //     .get();
  //   const feedbacks = [];
  //   snapshot.forEach(doc => {
  //     feedbacks.push({ id: doc.id, ...doc.data() });
  //   });
  //   return feedbacks;
  // }


  // export async function getAllCommentsForSites(uid) {
  //   const sites = await getUserSites(uid);

  //   // console.log({ sites });
  //   if (!sites.length) {
  //     return [];
  //   }

  //   const siteCommentKeys = sites.map((site) => site.commentKey);
  //   const docRefArray = siteCommentKeys.map(commentKey => )
  // const snapshot = await db
  //   .collection('comment')
  //   .where('ID', 'in', siteCommentKeys)
  //   .get();

  const comments = [];

  // snapshot.forEach((doc) => {
  //   comments.push({ id: doc.id, ...doc.data() });
  // });

  return comments;
}
