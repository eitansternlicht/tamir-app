import React from 'react';
import { Button, Text, Container } from 'native-base';
import { firebase } from '../utils/firebase/firebase-db';

class SettingsScene extends React.Component {
  static navigationOptions = {
    title: 'הגדרות'
  };

  render() {
    return (
      <Container style={{ justifyContent: 'center' }}>
        <Button
          style={{ alignSelf: 'center' }}
          onPress={() =>
            firebase
              .auth()
              .signOut()
              .then(() => this.props.navigation.navigate('AuthLoadingScene'))
          }>
          <Text>Log Out</Text>
        </Button>
      </Container>
    );
  }
}

export { SettingsScene };
