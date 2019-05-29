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
import { initNativeFirebase, getDB } from '../utils/firebase-utils';
import { ignoreFirebaseLoadingWarnings } from '../utils/react-native-utils';

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
              console.log('phone', this.props.navigation.state.params.phone);
              this.setState({ loading: true });
              ignoreFirebaseLoadingWarnings();
              initNativeFirebase().then(() => {
                // signIn().then(
                const signedIn = true;
                if (signedIn) {
                  getDB().then(db => {
                    this.props.navigation.navigate('MainScene', { db });
                  });
                }
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
