import React from 'react';
import { Container, Spinner } from 'native-base';
import { initFirebase, getDB } from '../utils/firebase-utils';
import { ignoreFirebaseLoadingWarnings } from '../utils/react-native-utils';

class AuthLoadingScene extends React.Component {
  constructor(props) {
    super(props);
    ignoreFirebaseLoadingWarnings();
    initFirebase();
    getDB().then(db => {
      const userLoggedIn = true;
      if (userLoggedIn) props.navigation.navigate('MainScene', { db });
    });
  }

  render() {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
}

export { AuthLoadingScene };
