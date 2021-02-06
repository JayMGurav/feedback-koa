import admin from 'firebase-admin';

const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(new RegExp("\\\\n", "\g"), "\n");
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const projectId = process.env.FIREBASE_PROJECT_ID;


if (!privateKey || !clientEmail || !projectId) {
  console.log(
    'Failed to load Firebase credentials.'
  );
}


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: clientEmail,
      private_key: privateKey,
      project_id: projectId
    }),
    databaseURL: 'https://feedback-koa.firebaseio.com'
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };