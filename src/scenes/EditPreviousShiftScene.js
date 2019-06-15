import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Content, Container } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import { addToEndIfDoesntExistAtEnd } from '../utils/general-utils';
import { timeWithDay } from '../utils/date-utils';
import { firebase, rnfirebase } from '../utils/firebase/firebase-db';
import { ShiftEditor } from '../components';

class EditPreviousShiftScene extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: moment(navigation.state.params.day).format('DD/MM/YYYY'),
      headerRight: (
        <Button
          disabled={
            !navigation.getParam('startTime') ||
            !navigation.getParam('endTime') ||
            navigation.getParam('startTime') > navigation.getParam('endTime')
          }
          onPress={navigation.state.params.onSave}
          title="שמור"
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      activities: props.activities,
      startTime: props.startTime,
      endTime: props.endTime
    };
    this.handleStartTimePicked = this.handleStartTimePicked.bind(this);
    this.handleEndTimePicked = this.handleEndTimePicked.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSave: this.onSave });
  }

  onSave() {
    const { uid, day, newShift, db } = this.props.navigation.state.params;
    console.log('eitan day', day);
    const { startTime, endTime, activities } = this.state;
    console.log('eitan startTime ', startTime);
    console.log('eitan endTime ', endTime);
    // debugger;
    const startTimeWithDay = timeWithDay(day, startTime);
    const endTimeWithDay = timeWithDay(day, endTime);
    const attendanceDays = db.AttendanceDays;
    if (newShift) {
      if (uid) {
        firebase
          .firestore()
          .collection('AttendanceDays')
          .doc(uid)
          .update({
            shifts: rnfirebase.firestore.FieldValue.arrayUnion({
              startTime: startTimeWithDay,
              endTime: endTimeWithDay,
              activities
            })
          });
      } else {
        firebase
          .firestore()
          .collection('AttendanceDays')
          .add({
            owners: { tutors: [firebase.auth().currentUser.uid] },
            day,
            shifts: [
              {
                startTime: startTimeWithDay,
                endTime: endTimeWithDay,
                activities
              }
            ]
          });
      }
      this.props.navigation.navigate('AttendanceCalendarScene', { db });
    }
    // if (Object.keys(attendanceDays).length !== 0)
    else {
      // exists, therefore update
      const [attendanceDayUID, attendanceDay] = Object.keys(attendanceDays).map(key => [
        key,
        attendanceDays[key]
      ])[0];
      attendanceDay.shifts.push({ startTimeWithDay, endTimeWithDay, activities });
      this.setState({ saveLoading: true });
      firebase
        .firestore()
        .collection('AttendanceDays')
        .doc(uid)
        .set(attendanceDay, { merge: true })
        .then(() => {
          console.log('Document successfully updated!', attendanceDayUID);
          // this.resetState();
        });
    }
  }

  handleStartTimePicked(time) {
    this.setState({ startTime: time });
    this.props.navigation.setParams({ startTime: time });
  }

  handleEndTimePicked(time) {
    this.setState({ endTime: time });
    this.props.navigation.setParams({ endTime: time });
  }

  render() {
    const { db } = this.props.navigation.state.params;
    return (
      <Container style={{ padding: 10 }}>
        <Content>
          <ShiftEditor
            startTime={this.state.startTime}
            endTime={this.state.endTime}
            activities={this.state.activities}
            onPressAddActivity={() =>
              this.props.navigation.navigate('ChooseActivityTypeScene', {
                db,
                returnTo: 'EditPreviousShiftScene'
              })
            }
            handleStartTimePicked={this.handleStartTimePicked}
            handleEndTimePicked={this.handleEndTimePicked}
          />
          <NavigationEvents
            onDidFocus={payload => {
              if (payload.state.params && payload.state.params.newActivity)
                this.setState(prevState => ({
                  activities: addToEndIfDoesntExistAtEnd(
                    payload.state.params.newActivity,
                    prevState.activities
                  )
                }));
            }}
          />
        </Content>
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

export { EditPreviousShiftScene };
