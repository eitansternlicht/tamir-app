import React from 'react';
import { Button, Text, Container, Icon } from 'native-base';
import { firebase } from '../utils/firebase/firebase-db';

class SettingsScene extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button transparent onPress={() => navigation.openDrawer()}>
          <Icon name="menu" />
        </Button>
      )
    };
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
