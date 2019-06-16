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
    const { activities, startTime, endTime } = props.navigation.state.params;
    this.state = {
      activities: activities || [],
      startTime: startTime || null,
      endTime: endTime || null
    };
    this.handleStartTimePicked = this.handleStartTimePicked.bind(this);
    this.handleEndTimePicked = this.handleEndTimePicked.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSave: this.onSave });
  }

  onSave() {
    const { uid, day, newShift, db, allShifts, shiftIndex } = this.props.navigation.state.params;
    const { startTime, endTime, activities } = this.state;
    const startTimeWithDay = timeWithDay(day, startTime);
    const endTimeWithDay = timeWithDay(day, endTime);
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
    } else {
      const allShiftsStripped = allShifts.map(
        ({ activities: _activities, endTime: _endTime, startTime: _startTime }) => ({
          activities: _activities,
          endTime: _endTime,
          startTime: _startTime
        })
      );
      allShiftsStripped[shiftIndex] = {
        startTime: startTimeWithDay,
        endTime: endTimeWithDay,
        activities
      };
      firebase
        .firestore()
        .collection('AttendanceDays')
        .doc(uid)
        .set({ shifts: allShiftsStripped }, { merge: true });
    }
    this.props.navigation.navigate('AttendanceCalendarScene', { db });
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
    const { db, activities, startTime, endTime } = this.props.navigation.state.params;
    return (
      <Container style={{ padding: 10 }}>
        <Content>
          <ShiftEditor
            startTime={startTime || this.state.startTime}
            endTime={endTime || this.state.endTime}
            activities={activities || this.state.activities}
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
