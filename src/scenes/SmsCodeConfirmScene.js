import React from 'react';
import { Container, Content, Input, Label, Form, Item, Button, Spinner, Text } from 'native-base';
import { Alert } from 'react-native';
import GlobalFont from 'react-native-global-font';

class SmsCodeConfirmScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, code: '' };
  }

  componentDidMount() {
    const fontName = 'Assistant-Bold';
    GlobalFont.applyGlobal(fontName);
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Confirmation code</Label>
              <Input
                autoFocus
                onChangeText={text => this.setState({ code: text })}
                value={this.state.code}
              />
            </Item>
            <Button
              style={[styles.buttonOneStyle, { alignSelf: 'center', marginTop: 40 }]}
              onPress={() => {
                if (this.state.code !== '') {
                  const { confirmResult } = this.props.navigation.state.params;
                  this.setState({ loading: true });
                  confirmResult
                    .confirm(this.state.code)
                    .then(() => this.props.navigation.navigate('MainScene'))
                    .catch(() => Alert.alert('Wrong code entered!'));
                } else {
                  Alert.alert('Please enter the given code');
                }
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
    justifyContent: 'center'
  }
};
export { SmsCodeConfirmScene };
