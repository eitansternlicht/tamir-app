import React from 'react';
import { View } from 'react-native';
import { Container, Tabs, Tab, Button, Icon, Spinner, Text } from 'native-base';
import { appName } from '../../app.json';
import { AttendanceTabScene, StudentsTabScene } from '.';
import { firebase, readDB } from '../utils/firebase/firebase-db';

class MainScene extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    if (navigation.getParam('longPressedState')) {
      return {
        headerLeft: (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button
              transparent
              onPress={() => navigation.navigate('MainScene', { longPressedState: false })}>
              <Icon name="arrow-back" />
            </Button>
            <Button transparent onPress={() => navigation.state.params.onPressDeleteStudents()}>
              <Icon name="trash" style={{ color: 'red' }} />
            </Button>
            <Text style={{ fontSize: 20 }}>הסרת חניכים מקבוצות</Text>
          </View>
        )
      };
    }
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

  constructor(props) {
    super(props);
    this.state = {};
    const tutorUID = firebase.auth().currentUser.uid;
    readDB(tutorUID, this);
  }

  render() {
    return (
      <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {!this.state.loadedAll ? (
          <Spinner />
        ) : (
          <Tabs>
            <Tab heading="חניכים">
              <StudentsTabScene
                navigation={this.props.navigation}
                db={{
                  AttendanceDays: this.state.AttendanceDays,
                  Groups: this.state.Groups,
                  Students: this.state.Students
                }}
              />
            </Tab>
            <Tab heading="נוכחות">
              <AttendanceTabScene
                navigation={this.props.navigation}
                db={{
                  AttendanceDays: this.state.AttendanceDays,
                  Groups: this.state.Groups,
                  Students: this.state.Students
                }}
              />
            </Tab>
          </Tabs>
        )}
      </Container>
    );
  }
}

export default MainScene;
