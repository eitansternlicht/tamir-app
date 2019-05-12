import React from 'react';
import { Container, Spinner } from 'native-base';

class AuthLoadingScene extends React.Component {
  constructor(props) {
    super(props);
    if (!props.loggedIn) props.navigation.navigate('LogInScene');
    else props.navigation.navigate('MainScene'); // WON'T HAPPEN
  }

  render() {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
}

export { AuthLoadingScene };
