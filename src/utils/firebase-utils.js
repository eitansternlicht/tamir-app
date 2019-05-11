import firebase from 'firebase/app';
import update from 'immutability-helper';
import { entriesToObj, zip } from './general-utils';

const COLLECTIONS = ['Activities', 'Groups', 'Students'];

// const f = () => {
//   firebase.auth().languageCode = 'he';
//   firebase.auth().signInWithPhoneNumber()
// }

const groupsWithStudentDetails = db =>
  update(db.Groups, {
    $set: entriesToObj(
      Object.keys(db.Groups).map(groupUID => [
        groupUID,
        update(db.Groups[groupUID], {
          participants: {
            $set: entriesToObj(
              Object.keys(db.Groups[groupUID].participants).map(studentUID => [
                studentUID,
                update(db.Groups[groupUID].participants[studentUID], {
                  $set: getByNamespacedId(studentUID, db)
                })
              ])
            )
          }
        })
      ])
    )
  });

const getByNamespacedId = (namespacedId, db) => {
  const [namespace, id] = splitNamespacedId(namespacedId);
  return db[namespace] && db[namespace][id] ? db[namespace][id] : undefined;
};

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

const splitNamespacedId = namespacedId => {
  for (let i = 0; i < namespacedId.length; i += 1) {
    if (namespacedId[i] === '/') {
      return [namespacedId.slice(0, i), namespacedId.slice(i + 1)];
    }
  }
  return ['', namespacedId];
};

export { getDB, initFirebase, getByNamespacedId, groupsWithStudentDetails };
