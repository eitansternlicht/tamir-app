import React from 'react';
import { Container, Tabs, Tab, Button, Icon } from 'native-base';
import { appName } from '../../app.json';
import { AttendanceTabScene, StudentsTabScene } from '.';

class MainScene extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: appName,
      headerLeft: null,
      headerRight: (
        <Button transparent onPress={() => navigation.openDrawer()}>
          <Icon name="menu" />
        </Button>
      )
    };
  };

  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading="חניכים">
            <StudentsTabScene
              navigation={this.props.navigation}
              db={this.props.navigation.state.params.db}
            />
          </Tab>
          <Tab heading="נוכחות">
            <AttendanceTabScene
              navigation={this.props.navigation}
              db={this.props.navigation.state.params.db}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default MainScene;
