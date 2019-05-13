import React from 'react';
import {
  Container,
  Text,
  Card,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Spinner,
  Button
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { initFirebase, initNativeFirebase, getDB } from '../utils/firebase-utils';
import { ignoreFirebaseLoadingWarnings } from '../utils/react-native-utils';

const INITIAL_STATE = { loading: false, phone: '', password: '' };

class LogInScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    return (
      <Container>
        <Header />
        <Text style={styles.textTitle}>Sign In</Text>

        <Content>
          <Card>
            <Form>
              <Item floatingLabel>
                <Label>phone number</Label>
                <Input value={this.state.phone} onChangeText={phone => this.setState({ phone })} />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input
                  secureTextEntry
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                />
              </Item>
            </Form>
          </Card>

          <Button
            style={styles.buttonOneStyle}
            onPress={() => {
              this.setState({ loading: true });
              ignoreFirebaseLoadingWarnings();
              initNativeFirebase().then(() => {
                // signIn().then(
                const signedIn = true;
                if (signedIn) {
                  getDB().then(db => {
                    this.setState({ loading: false });
                    this.props.navigation.navigate('MainScene', { db });
                  });
                }
              });
            }}>
            {this.state.loading ? <Spinner /> : <Text style={styles.textStyle}>Sign In</Text>}
          </Button>

          <TouchableOpacity style={styles.buttonTwoStyle}>
            <Text style={styles.textStyle}>Get Password By Sms</Text>
          </TouchableOpacity>
        </Content>
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
  textTitle: {
    alignSelf: 'center',
    color: '#aaa',
    fontSize: 16,
    fontWeight: '600'
  },
  buttonOneStyle: {
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
    marginHorizontal: 80,
    marginBottom: 10,
    marginTop: 70
  },
  buttonTwoStyle: {
    alignSelf: 'stretch',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
    marginHorizontal: 80,
    marginBottom: 10,
    marginTop: 35
  }
};
export { LogInScene };
