import React from 'react';
import { View, StyleSheet } from 'react-native';
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
            <Text style={{ fontFamily: 'Assistant-Bold', fontSize: 20 }}>הסרת חניכים מקבוצות</Text>
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
      <Container
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {!this.state.loadedAll ? (
          <Spinner />
        ) : (
          <Tabs tabBarUnderlineStyle={{ borderBottomWidth: -3, backgroundColor: '#5EC8F2' }}>
            <Tab
              heading="חניכים"
              tabStyle={{ backgroundColor: '#FFFFFF' }}
              textStyle={{ fontFamily: 'Assistant-Bold', color: '#787878' }}
              activeTabStyle={{ backgroundColor: '#FFFFFF' }}
              activeTextStyle={{ fontFamily: 'Assistant-Bold', color: '#787878' }}>
              <StudentsTabScene
                navigation={this.props.navigation}
                db={{
                  AttendanceDays: this.state.AttendanceDays,
                  Groups: this.state.Groups,
                  Students: this.state.Students
                }}
              />
            </Tab>
            <Tab
              heading="נוכחות"
              tabStyle={{ backgroundColor: '#FFFFFF' }}
              textStyle={{ fontFamily: 'Assistant-Bold', color: '#787878' }}
              activeTabStyle={{ backgroundColor: '#FFFFFF' }}
              activeTextStyle={{ fontFamily: 'Assistant-Bold', color: '#787878' }}>
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
const styles = StyleSheet.create({
  button: {
    color: '#FFFFFF'
  },
  text: {
    fontFamily: 'Assistant-Bold'
  },
  tab: {
    color: '#FFFFFF'
  }
});

export default MainScene;
