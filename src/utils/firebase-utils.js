import firebase from 'firebase/app';
import { entriesToObj, zip } from './general-utils';

const COLLECTIONS = ['Activities', 'Groups', 'Students'];

const getDB = async () => {
  const promises = COLLECTIONS.map(collection =>
    firebase
      .firestore()
      .collection(collection)
      .get()
      .then(snapshot => entriesToObj(snapshot.docs.map(doc => [doc.id, doc.data()])))
  );
  const list = await Promise.all(promises);
  return entriesToObj(zip(COLLECTIONS, list));
};

const initFirebase = () =>
  firebase.initializeApp({
    apiKey: 'AIzaSyDEaOcHtrnBB3GQ12z1nR9qRNfwEIsNrFo',
    authDomain: 'tamir-db.firebaseapp.com',
    databaseURL: 'https://tamir-db.firebaseio.com',
    projectId: 'tamir-db',
    storageBucket: 'tamir-db.appspot.com',
    messagingSenderId: '463912944330'
  });

export { getDB, initFirebase };
