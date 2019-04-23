import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container, Button, Text, Icon } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { toClockTime } from '../../utils/date-utils';

const activities = [
  { shortTitle: 'פעילות א׳', key: 'a' },
  { shortTitle: 'פעילות ב׳', key: 'b' },
  { shortTitle: 'פעילות ג׳', key: 'c' }
];
class AttendanceTab extends React.Component {
  constructor(props) {
    super(props);
    this.showStartTimePicker = this.showStartTimePicker.bind(this);
    this.showEndTimePicker = this.showEndTimePicker.bind(this);
    this.hideEndTimePicker = this.hideEndTimePicker.bind(this);
    this.hideStartTimePicker = this.hideStartTimePicker.bind(this);
    this.handleStartTimePicked = this.handleStartTimePicked.bind(this);
    this.handleEndTimePicked = this.handleEndTimePicked.bind(this);
    this.state = {
      startTime: null,
      endTime: null,
      startTimePickerOpen: false,
      endTimePickerOpen: false
    };
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
      <Container style={styles.container}>
        <Container style={styles.section}>
          <Button>
            <Icon name="calendar" />
            <Text>עריכת נוכחות</Text>
          </Button>
        </Container>
        <Container style={styles.section}>
          {this.renderTime({ startTime: this.state.startTime })}
          <Button onPress={this.showStartTimePicker}>
            <Text>כניסה</Text>
          </Button>
        </Container>
        <Container style={styles.section}>
          {this.renderTime({ endTime: this.state.endTime })}
          <Button onPress={this.showEndTimePicker}>
            <Text>יציאה</Text>
          </Button>
        </Container>

        <Container style={[styles.section, { padding: 0, paddingTop: 0 }]}>
          <Text style={styles.activities}>פעילויות</Text>
          <Icon name="arrow-dropdown" />
        </Container>
        <FlatList data={activities} renderItem={({ item }) => <Text>{item.shortTitle}</Text>} />

        <Container style={[styles.section, { padding: 0, paddingTop: 0 }]}>
          <Text style={styles.activities}>הוסף פעילות</Text>
          <Icon name="add-circle" />
        </Container>

        <Container style={[styles.section, { justifyContent: 'center' }]}>
          <Button>
            <Text>שמור</Text>
          </Button>
        </Container>
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
      </Container>
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
    paddingRight: 10,
    fontSize: 18
  }
});

export { AttendanceTab };
