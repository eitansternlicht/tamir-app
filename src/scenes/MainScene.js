import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Tabs, Tab, Button, Icon, Spinner, Text } from 'native-base';
import GlobalFont from 'react-native-global-font';
import NavigationBar from 'react-native-navbar';
import { appName } from '../../app.json';
import { AttendanceTabScene, StudentsTabScene } from '.';
import { firebase, readDB } from '../utils/firebase/firebase-db';
import { removeParticipantsThatDontExist } from '../utils/firebase/local-db';

class MainScene extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    if (navigation.getParam('longPressedState')) {
      return {
        headerLeft: (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button
              transparent
              onPress={() =>
                navigation.navigate('MainScene', { longPressedState: false, firstSelected: false })
              }>
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
      title: '',
      headerLeft: (
        <Image
          // eslint-disable-next-line global-require
          source={require('../../assets/images/tamir_logoshakuf_notext.png')}
          style={{
            width: 80,
            height: 50,
            alignSelf: 'center',
            // flexDirection: 'row'
            marginLeft: 180
          }}
        />
      ),
      headerRight: (
        <Button transparent onPress={() => navigation.openDrawer()}>
          <Icon name="menu" style={{ color: '#5EC8F2' }} />
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

  componentDidMount() {
    const fontName = 'Assistant-Bold';
    GlobalFont.applyGlobal(fontName);
  }

  render() {
    const { loadedAll, AttendanceDays, Groups, Students } = this.state;
    return (
      <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {!loadedAll ? (
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
                  AttendanceDays,
                  Groups: removeParticipantsThatDontExist(Groups, Students),
                  Students
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
                  AttendanceDays,
                  Groups: removeParticipantsThatDontExist(Groups, Students),
                  Students
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
    color: '#5EC8F2'
  },
  text: {
    fontFamily: 'Assistant-Bold'
  },
  tab: {
    color: '#FFFFFF'
  }
});

export default MainScene;
