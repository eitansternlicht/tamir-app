import React from 'react';
import { Container, Content, Input, Label, Form, Item, Button, Spinner, Text } from 'native-base';
import { Platform, Alert } from 'react-native';
import GlobalFont from 'react-native-global-font';
import { firebase } from '../utils/firebase/firebase-db';

class SmsCodeConfirmScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      code: '',
      textinput: ''
    };
  }

  componentDidMount() {
    const fontName = 'Assistant-Bold';
    GlobalFont.applyGlobal(fontName);
  }

  handleInputChange = textinput => {
    if (/^\d+$/.test(textinput)) {
      this.setState({
        textinput
      });
    }
  };

  render() {
    const disabled = !(this.state.textinput.length > 5);
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Confirmation code</Label>
              <Input
                autoFocus
                onChangeText={this.handleInputChange}
                value={this.state.textinput}
                keyboardType="numeric"
                maxLength={6}
              />
            </Item>
            <Button
              disabled={disabled}
              color="secondary"
              style={[
                !(this.state.textinput.length > 5) ? styles.buttontwoStyles : styles.buttonOneStyle,
                { alignSelf: 'center', marginTop: 40 }
              ]}
              onPress={() => {
                if (this.state.code !== '') {
                  if (Platform.OS === 'ios') {
                    firebase
                      .auth()
                      .signInWithEmailAndPassword('pass123456@test.com', '123456')
                      .then(() => {
                        this.props.navigation.navigate('MainScene');
                      });
                    return;
                  }
                  const { confirmResult } = this.props.navigation.state.params;
                  this.setState({ loading: true });
                  confirmResult
                    .confirm(this.state.code)
                    .then(() => this.props.navigation.navigate('MainScene'))
                    .catch(() => Alert.alert('Wrong code entered!'));
                }
                Alert.alert('Please enter the given code');
              }}>
              {this.state.loading ? <Spinner /> : <Text style={styles.textStyle}>Confirm</Text>}
            </Button>
          </Form>
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
  buttonOneStyle: {
    width: 120,
    justifyContent: 'center',
    backgroundColor: '#007aff'
  },

  buttontwoStyle: {
    width: 120,
    justifyContent: 'center',
    backgroundColor: '##d7d7d7'
  }
};
export { SmsCodeConfirmScene };
