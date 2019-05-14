import React from 'react';
import { Button, Text, Container } from 'native-base';

class SettingsScene extends React.Component {
  static navigationOptions = {
    title: 'הגדרות'
  };

  render() {
    return (
      <Container>
        <Button>
          <Text>Log Out</Text>
        </Button>
      </Container>
    );
  }
}

export { SettingsScene };
