import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base';
import GlobalFont from 'react-native-global-font';
import { initNativeFirebase, firebase } from '../utils/firebase/firebase-db';

class AuthLoadingScene extends React.Component {
  constructor(props) {
    super(props);
    initNativeFirebase().then(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        console.log('signed in', user.uid);
        props.navigation.navigate('MainScene');
      } else {
        console.log('not signed in');
        props.navigation.navigate('PhoneInputScene');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export { AuthLoadingScene };
