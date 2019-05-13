import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { NavigationEvents } from 'react-navigation';
import { toClockTime } from '../utils/date-utils';
import { right } from '../utils/style-utils';
import { getStudentName } from '../utils/student-utils';
import { addToEndIfDoesntExistAtEnd } from '../utils/general-utils';

class AttendanceTabScene extends React.Component {
  constructor(props) {
    super(props);
    this.showStartTimePicker = this.showStartTimePicker.bind(this);
    this.showEndTimePicker = this.showEndTimePicker.bind(this);
    this.hideEndTimePicker = this.hideEndTimePicker.bind(this);
    this.hideStartTimePicker = this.hideStartTimePicker.bind(this);
    this.handleStartTimePicked = this.handleStartTimePicked.bind(this);
    this.handleEndTimePicked = this.handleEndTimePicked.bind(this);
    this.state = {
      activities: [],
      startTime: null,
      endTime: null,
      startTimePickerOpen: false,
      endTimePickerOpen: false
    };
    console.log(props.navigation.state.params);
  }

  showStartTimePicker() {
    this.setState({ startTimePickerOpen: true });
  }

  showEndTimePicker() {
    this.setState({ endTimePickerOpen: true });
  }

  hideStartTimePicker() {
    this.setState({ startTimePickerOpen: false });
  }

  hideEndTimePicker() {
    this.setState({ endTimePickerOpen: false });
  }

  handleStartTimePicked(time) {
    this.setState({ startTime: time, startTimePickerOpen: false });
  }

  handleEndTimePicked(time) {
    this.setState({ endTime: time, endTimePickerOpen: false });
  }

  renderTime({ startTime, endTime }) {
    const time = startTime || endTime;
    if (time) {
      return (
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={startTime ? this.showStartTimePicker : this.showEndTimePicker}>
          <Icon
            name="create"
            style={{ fontSize: 20, color: 'blue', paddingTop: 5, paddingRight: 5 }}
          />
          <Text style={styles.time}>{toClockTime(time)}</Text>
        </TouchableOpacity>
      );
    }
    return <Text style={styles.time}>{toClockTime(time)}</Text>;
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={payload => {
            if (payload.state.params && payload.state.params.newActivity)
              this.setState(state => ({
                activities: addToEndIfDoesntExistAtEnd(
                  payload.state.params.newActivity,
                  state.activities
                )
              }));
          }}
        />
        <View style={styles.section}>
          <Button onPress={() => this.props.navigation.navigate('AttendanceCalendarScene')}>
            <Icon name="calendar" />
            <Text>נוכחות קודמת</Text>
          </Button>
        </View>
        <View style={styles.section}>
          {this.renderTime({ startTime: this.state.startTime })}
          <Button onPress={() => this.setState({ startTime: new Date() })}>
            <Text>כניסה</Text>
          </Button>
        </View>
        <View style={styles.section}>
          {this.renderTime({ endTime: this.state.endTime })}
          <Button
            onPress={() => {
              this.setState({ endTime: new Date() });
              this.props.navigation.navigate('ChooseActivityTypeScene', {
                db: this.props.navigation.state.params.db
              });
            }}>
            <Text>יציאה</Text>
          </Button>
        </View>

        <View style={styles.section}>
          <Text style={styles.activities}>פעילויות</Text>
          <Icon name="arrow-dropdown" />
        </View>
        <FlatList
          data={this.state.activities}
          keyExtractor={item => JSON.stringify(item)}
          renderItem={({ item }) => (
            <Text style={styles.activityListItem}>
              {item.discussion
                ? `שיחה אישית - ${item.discussion.type} עם: ${getStudentName(
                    item.discussion.student
                  )}`
                : 'TODO'}
            </Text>
          )}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('ChooseActivityTypeScene', { db: this.props.db })
          }
          style={styles.section}>
          <Text style={styles.activities}>הוסף פעילות</Text>
          <Icon type="MaterialIcons" name="add-circle-outline" />
        </TouchableOpacity>

        <View style={[styles.section, { justifyContent: 'center' }]}>
          <Button>
            <Text>שמור</Text>
          </Button>
        </View>
        <DateTimePicker
          mode="time"
          isVisible={this.state.startTimePickerOpen}
          onConfirm={this.handleStartTimePicked}
          onCancel={this.hideStartTimePicker}
        />
        <DateTimePicker
          mode="time"
          isVisible={this.state.endTimePickerOpen}
          onConfirm={this.handleEndTimePicked}
          onCancel={this.hideEndTimePicker}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10
  },
  section: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 5
  },
  time: {
    padding: 5,
    paddingRight: 50,
    color: 'blue'
  },
  activities: {
    textAlign: right,
    paddingRight: 10,
    fontSize: 18
  },
  activityListItem: {
    textAlign: right
  }
});

export { AttendanceTabScene };
