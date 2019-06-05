import React from 'react';
import {
  Container,
  Content,
  Footer,
  Input,
  Label,
  Form,
  Item,
  Button,
  Spinner,
  Text
} from 'native-base';
import { firebase } from '../utils/firebase/firebase-db';
import { ignoreFirebaseLoadingWarnings } from '../utils/firebase/react-native-utils';

const INITIAL_STATE = { loading: false, code: '' };

class SmsCodeConfirmScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Confirmation code</Label>
              <Input onChangeText={text => this.setState({ code: text })} value={this.state.code} />
            </Item>
          </Form>
        </Content>
        <Footer>
          <Button
            style={styles.buttonOneStyle}
            onPress={() => {
              const { phone } = this.props.navigation.state.params;
              this.setState({ loading: true });
              ignoreFirebaseLoadingWarnings();
              // TODO change to real phone auth
              firebase
                .auth()
                .signInWithEmailAndPassword('pass123456@test.com', '123456')
                .then(() => {
                  console.log('signed in with uid', firebase.auth().currentUser.uid);
                  this.props.navigation.navigate('MainScene');
                });
            }}>
            {this.state.loading ? <Spinner /> : <Text style={styles.textStyle}>Confirm</Text>}
          </Button>
        </Footer>
      </Container>
    );
  }
}
const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  buttonOneStyle: {
    width: 120,
    justifyContent: 'center'
  }
};
export { SmsCodeConfirmScene };
