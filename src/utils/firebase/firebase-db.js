import { Platform } from 'react-native';
import rnfirebase from 'react-native-firebase';
import { entriesToObj } from '../general-utils';
import { FIREBASE_APP_NAME, COLLECTIONS, CONFIG_ANDROID, CONFIG_IOS } from './constants';
import { removeTime } from '../date-utils';
/**
 * This is the variable to use to replace previous firebase web api's
 * */
const firebase = rnfirebase.initializeApp(
  Platform.OS === 'ios' ? CONFIG_IOS : CONFIG_ANDROID,
  FIREBASE_APP_NAME
);
/**
 * returns a promise when firebase is initialized
 * use this function first and only once when app first loads data from firebase.
 * afterwards use firebase variable to access firebase api
 * */
const initNativeFirebase = () => firebase.onReady();

/**
 * reads all COLLECTIONS from firebase
 * returns a promise retuning DB as a JS object.
 * e.g.
 * db = {
 *      AttendanceDays: {
 * TODO update to new format
 *          lh1Ssmo: {name: "פעילות א", groupsAttended: {…}, startTime: Timestamp}
 *      },
 *      Groups: {
 *          Jfkudx: {name: "קבוצה א", participants: {…}},
 *          hTy8OP: {name: "קבוצה ב", participants: {…}}
 *      },
 *      Students: {
 *          AcQDADi: {שם משפחה: "ה", תעודת זהות: "204070635", מידה חולצה: "S", מוסד לימודים: "בית ספר דוגמה", קבוצות: null, …}
 *          FeglvpLl: {שם משפחה: "ג", תעודת זהות: "204070635", מידה חולצה: "S", מוסד לימודים: "בית ספר דוגמה", קבוצות: null, …}
 *      }
 * }
 * usage:
 * readDB().then(db => console.log(db));
 * */
// const readDB = async uid => {
//   const promises = COLLECTIONS.map(collection =>
//     collection === 'Tutors'
//       ? firebase
//           .firestore()
//           .collection(collection)
//           .doc(uid)
//           .get()
//           .then(doc => entriesToObj([[uid, doc.data()]]))
//       : firebase
//           .firestore()
//           .collection(collection)
//           .where('owners.tutors', 'array-contains', uid)
//           .get()
//           .then(snapshot => entriesToObj(snapshot.docs.map(doc => [doc.id, doc.data()])))
//   );
//   const list = await Promise.all(promises);
//   return entriesToObj(zip(COLLECTIONS, list));
// };
const toState = (collection, snapshot, prevState) => {
  const otherCollections = COLLECTIONS.filter(c => c !== collection);
  const existAlready = otherCollections.filter(c => prevState[c]);
  if (otherCollections.length === existAlready.length)
    return {
      loadedAll: true,
      [collection]: entriesToObj(snapshot.docs.map(doc => [doc.id, doc.data()]))
    };
  return { [collection]: entriesToObj(snapshot.docs.map(doc => [doc.id, doc.data()])) };
};

const readDB = (uid, that) => {
  COLLECTIONS.forEach(collection =>
    collection === 'AttendanceDays'
      ? firebase
          .firestore()
          .collection(collection)
          .where('owners.tutors', 'array-contains', uid)
          .where('day', '==', removeTime(new Date()))
          .onSnapshot(snapshot =>
            that.setState(prevState => toState(collection, snapshot, prevState))
          )
      : firebase
          .firestore()
          .collection(collection)
          .where('owners.tutors', 'array-contains', uid)
          .onSnapshot(snapshot =>
            that.setState(prevState => toState(collection, snapshot, prevState))
          )
  );
};

const updateDoc = (collection, uid, obj) =>
  firebase
    .firestore()
    .collection(collection)
    .doc(uid)
    .set(obj);

const createNewGroup = newGroupName =>
  firebase
    .firestore()
    .collection('Groups')
    .add({
      owners: { tutors: [firebase.auth().currentUser.uid] },
      name: newGroupName,
      participants: {}
    });

const deleteGroup = groupUID =>
  firebase
    .firestore()
    .collection('Groups')
    .doc(groupUID)
    .delete();

const editGroupName = (groupUID, newName) =>
  firebase
    .firestore()
    .collection('Groups')
    .doc(groupUID)
    .update({ name: newName });
export {
  firebase,
  readDB,
  updateDoc,
  initNativeFirebase,
  rnfirebase,
  createNewGroup,
  deleteGroup,
  editGroupName
};
