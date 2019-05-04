/* eslint-disable no-unused-vars */
import firebase from 'firebase/app';
import React from 'react';
import { MainScene } from './scenes';

class App extends React.Component {
  constructor(props) {
    super(props);
    firebase.initializeApp({
      apiKey: 'AIzaSyDEaOcHtrnBB3GQ12z1nR9qRNfwEIsNrFo',
      authDomain: 'tamir-db.firebaseapp.com',
      databaseURL: 'https://tamir-db.firebaseio.com',
      projectId: 'tamir-db',
      storageBucket: 'tamir-db.appspot.com',
      messagingSenderId: '463912944330'
    });
  }

  render() {
    return (
      <GroupParticipantsAttendanceScene
        activityID="lh1Ssm0wYPEiBCQxjvco"
        selectedGroupID="hTy8OP7gIPFyhX4cVjAR"
      />
    );
  }
}

export default App;
