import React from 'react';
import { Container, Text, Card, Header, Content, Form, Item, Input, Label } from 'native-base';
import { TouchableOpacity } from 'react-native';

const INITIAL_STATE = { phone: '', password: '' };

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

          <TouchableOpacity style={styles.buttonOneStyle}>
            <Text style={styles.textStyle}>Sign In</Text>
          </TouchableOpacity>

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
    fontWeight: '600',
    paddingVertical: 10
  },
  textTitle: {
    alignSelf: 'center',
    color: '#aaa',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 50,
    paddingBottom: 10
  },
  buttonOneStyle: {
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
