import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon, Content, Container, Footer, Spinner } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import update from 'immutability-helper';
import { addToEndIfDoesntExistAtEnd } from '../utils/general-utils';
import { removeTime } from '../utils/date-utils';
import { firebase } from '../utils/firebase/firebase-db';
import { dbWithNoGroup } from '../utils/firebase/local-db';
import { ShiftEditor } from '../components';

const INITIAL_STATE = {
  activities: [],
  startTime: null,
  endTime: null,
  saveLoading: false
};
class AttendanceTabScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.handleStartTimePicked = this.handleStartTimePicked.bind(this);
    this.handleEndTimePicked = this.handleEndTimePicked.bind(this);
    this.onSave = this.onSave.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  onSave() {
    const { startTime, endTime, activities } = this.state;
    const attendanceDays = this.props.db.AttendanceDays;
    if (Object.keys(attendanceDays).length !== 0) {
      // exists, therefore update
      const [attendanceDayUID, attendanceDay] = Object.keys(attendanceDays).map(key => [
        key,
        attendanceDays[key]
      ])[0];
      attendanceDay.shifts.push({ startTime, endTime, activities });
      this.setState({ saveLoading: true });
      firebase
        .firestore()
        .collection('AttendanceDays')
        .doc(attendanceDayUID)
        .set(attendanceDay, { merge: true })
        .then(() => {
          console.log('Document successfully updated!', attendanceDayUID);
          this.resetState();
        });
    } else {
      // create new
      const attendanceDay = {
        owners: { tutors: [firebase.auth().currentUser.uid] },
        day: removeTime(new Date()), // TODO
        shifts: [
          {
            startTime,
            endTime,
            activities
          }
        ]
      };
      this.setState({ saveLoading: true });
      firebase
        .firestore()
        .collection('AttendanceDays')
        .add(attendanceDay)
        .then(ref => {
          console.log('Document successfully created!', ref.id);
          this.resetState();
        });
    }
  }

  resetState() {
    this.setState(INITIAL_STATE);
  }

  handleStartTimePicked(time) {
    this.setState({ startTime: time });
  }

  handleEndTimePicked(time) {
    this.setState({ endTime: time });
  }

  render() {
    const { navigation, db } = this.props;
    const dbWithNoGroupAdded = dbWithNoGroup(db);
    return (
      <Container style={{ padding: 10 }}>
        <Content>
          <View style={[styles.section, { marginBottom: 30 }]}>
            <Button
              onPress={() =>
                navigation.navigate('AttendanceCalendarScene', { db: dbWithNoGroupAdded })
              }>
              <Icon name="calendar" />
              <Text>נוכחות קודמת</Text>
            </Button>
          </View>
          <ShiftEditor
            startTime={this.state.startTime}
            endTime={this.state.endTime}
            activities={this.state.activities}
            onPressAddActivity={() =>
              navigation.navigate('ChooseActivityTypeScene', {
                db: dbWithNoGroupAdded,
                actionType: 'newActivity'
              })
            }
            onPressEditActivity={(
              { type, subtype, groups, student, comments },
              editedActivityIndex
            ) => {
              const actionType = 'editActivity';
              if (type === 'שיחה אישית')
                this.props.navigation.navigate('EditDiscussionDetailsScene', {
                  actionType,
                  editedActivityIndex,
                  student,
                  type,
                  subtype,
                  comments,
                  db: dbWithNoGroupAdded
                });
              else if (type === 'פעילות קבוצתית')
                this.props.navigation.navigate('GroupActivityDetailsScene', {
                  actionType,
                  editedActivityIndex,
                  type,
                  subtype,
                  comments,
                  groups
                });
            }}
            handleStartTimePicked={this.handleStartTimePicked}
            handleEndTimePicked={this.handleEndTimePicked}
          />
          <NavigationEvents
            onDidFocus={payload => {
              if (payload.state.params) {
                if (payload.state.params.actionType === 'newActivity') {
                  this.setState(prevState => ({
                    activities: addToEndIfDoesntExistAtEnd(
                      payload.state.params.newActivity,
                      prevState.activities
                    )
                  }));
                } else if (payload.state.params.actionType === 'editActivity')
                  this.setState(prevState =>
                    update(prevState, {
                      activities: {
                        [payload.state.params.editedActivityIndex]: {
                          $set: payload.state.params.editedActivity
                        }
                      }
                    })
                  );
              }
            }}
          />
        </Content>

        <Footer>
          <Button
            onPress={this.onSave}
            disabled={
              !this.state.startTime ||
              !this.state.endTime ||
              this.state.startTime > this.state.endTime
            }>
            {this.state.saveLoading ? <Spinner /> : <Text>שמור</Text>}
          </Button>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 15
  }
});

export { AttendanceTabScene };
