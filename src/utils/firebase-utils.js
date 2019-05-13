import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
import update from 'immutability-helper';
import { entriesToObj, zip } from './general-utils';

const FIREBASE_APP_NAME = 'tamirapp';
const COLLECTIONS = ['Activities', 'Groups', 'Students'];

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
      .app(FIREBASE_APP_NAME)
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

const iosConfig = {
  clientId: '463912944330-q0tu8u3496nufjci84eoaeb8uvm3dhb6.apps.googleusercontent.com',
  appId: '1:463912944330:ios:64f18e29a7e438c2',
  apiKey: 'AIzaSyDh7dl3xp7tFEL4n90l7-SAhsibefQfTks',
  databaseURL: 'https://tamir-db.firebaseio.com',
  storageBucket: 'tamir-db.appspot.com',
  messagingSenderId: '463912944330',
  projectId: 'tamir-db',

  // enable persistence by adding the below flag
  persistence: true
};

const androidConfig = {
  clientId: '463912944330-2ugqfr9197k91cnpccme888e05ctdmer.apps.googleusercontent.com',
  appId: '1:463912944330:android:64f18e29a7e438c2',
  apiKey: 'AIzaSyCnchf2N5gv3ysE050JQYe8fLQy32OmBQs',
  databaseURL: 'https://tamir-db.firebaseio.com',
  storageBucket: 'tamir-db.appspot.com',
  messagingSenderId: '463912944330',
  projectId: 'tamir-db',
  // enable persistence by adding the below flag
  persistence: true
};

const tamirApp = firebase.initializeApp(
  Platform.OS === 'ios' ? iosConfig : androidConfig,
  FIREBASE_APP_NAME
);

const firebaseApp = firebase.app(FIREBASE_APP_NAME);

const initNativeFirebase = () => tamirApp.onReady();

export {
  firebaseApp,
  getDB,
  initFirebase,
  getByNamespacedId,
  groupsWithStudentDetails,
  initNativeFirebase
};
