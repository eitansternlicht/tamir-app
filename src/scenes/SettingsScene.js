import React from 'react';
import { Button, Text, Container } from 'native-base';
import GlobalFont from 'react-native-global-font';
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

  componentDidMount() {
    const fontName = 'Assistant-Bold';
    GlobalFont.applyGlobal(fontName);
  }

  render() {
    return (
      <Container style={{ justifyContent: 'center' }}>
        <Button
          style={{ alignSelf: 'center', backgroundColor: '#5EC8F2' }}
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
