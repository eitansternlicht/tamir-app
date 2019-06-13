import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Text, Icon, Content, Container, Footer, Spinner } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import { addToEndIfDoesntExistAtEnd } from '../utils/general-utils';
import { removeTime, timeWithDay } from '../utils/date-utils';
import { firebase, rnfirebase } from '../utils/firebase/firebase-db';
import { ShiftEditor } from '../components';

class EditPreviousShiftScene extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: moment(navigation.state.params.day).format('DD/MM/YYYY'),
      headerRight: <Button onPress={navigation.state.params.onSave} title="שמור" />
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
    const { startTime, endTime, activities } = this.state;
    const startTimeWithDay = timeWithDay(day, startTime);
    const endTimeWithDay = timeWithDay(day, endTime);
    const attendanceDays = db.AttendanceDays;
    if (newShift) {
      console.log('eitan new shift', this.state);
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
        this.props.navigation.navigate('AttendanceCalendarScene', { db });
      } else {
        // firebase
        //   .firestore()
        //   .collection('AttendanceDays')
        //   .add({});
      }
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
        .doc(this.props.uid)
        .set(attendanceDay, { merge: true })
        .then(() => {
          console.log('Document successfully updated!', attendanceDayUID);
          // this.resetState();
        });
    }
    // else {
    //   // create new
    //   const attendanceDay = {
    //     owners: { tutors: [firebase.auth().currentUser.uid] },
    //     day: removeTime(new Date()), // TODO
    //     shifts: [
    //       {
    //         startTime,
    //         endTime,
    //         activities
    //       }
    //     ]
    //   };
    //   this.setState({ saveLoading: true });
    //   firebase
    //     .firestore()
    //     .collection('AttendanceDays')
    //     .add(attendanceDay)
    //     .then(ref => {
    //       console.log('Document successfully created!', ref.id);
    //       this.resetState();
    //     });
    // }
  }

  handleStartTimePicked(time) {
    this.setState({ startTime: time });
  }

  handleEndTimePicked(time) {
    this.setState({ endTime: time });
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
