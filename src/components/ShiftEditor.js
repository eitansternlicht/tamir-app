import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { toClockTime } from '../utils/date-utils';
import { right } from '../utils/style-utils';

const renderActivity = ({ type, subtype, groups, student }) => {
  switch (type) {
    case 'שיחה אישית':
      return `${type} - ${subtype} עם: ${student.fullName}`;
    case 'פעילות קבוצתית':
      return `${type} - ${subtype} עם:\n ${groups
        .filter(({ attended }) => attended)
        .map(({ groupName }) => groupName)
        .toString()}`;
    case 'שונות':
      return type;
    default:
      console.error('activity type not valid!');
      return null;
  }
};

class ShiftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.showStartTimePicker = this.showStartTimePicker.bind(this);
    this.showEndTimePicker = this.showEndTimePicker.bind(this);
    this.hideEndTimePicker = this.hideEndTimePicker.bind(this);
    this.hideStartTimePicker = this.hideStartTimePicker.bind(this);

    this.state = {
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
    this.props.handleStartTimePicked(time);
    this.setState({ startTimePickerOpen: false });
  }

  handleEndTimePicked(time) {
    this.props.handleEndTimePicked(time);
    this.setState({ endTimePickerOpen: false });
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
      <View>
        <View style={[styles.section, { marginBottom: 30 }]}>
          {this.renderTime({ startTime: this.props.startTime })}
          <Button
            disabled={!!this.props.startTime}
            onPress={() => this.handleStartTimePicked(new Date())}>
            <Text>כניסה</Text>
          </Button>
        </View>
        <View style={[styles.section, { marginBottom: 30 }]}>
          {this.renderTime({ endTime: this.props.endTime })}
          <Button
            disabled={!this.props.startTime || !!this.props.endTime}
            onPress={() => {
              this.handleEndTimePicked(new Date());
              if (!this.props.activities || this.props.activities.length === 0)
                this.props.onPressAddActivity();
            }}>
            <Text>יציאה</Text>
          </Button>
        </View>

        <View style={[styles.section, { paddingBottom: 5 }]}>
          <Text style={styles.activities}>פעילויות</Text>
          <Icon name="arrow-dropdown" />
        </View>
        <FlatList
          style={{ paddingRight: 40 }}
          data={this.props.activities}
          keyExtractor={item => JSON.stringify(item)}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <Icon name="create" style={{ fontSize: 24, color: 'blue', paddingLeft: 10 }} />
              <Text style={styles.activityListItem}>{renderActivity(item)}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          onPress={this.props.onPressAddActivity}
          style={[styles.section, { paddingRight: 30, paddingTop: 10 }]}>
          <Text style={styles.activities}>הוסף פעילות</Text>
          <Icon type="MaterialIcons" name="add-circle-outline" />
        </TouchableOpacity>
        <DateTimePicker
          mode="time"
          isVisible={this.state.startTimePickerOpen}
          onConfirm={this.props.handleStartTimePicked}
          onCancel={this.hideStartTimePicker}
        />
        <DateTimePicker
          mode="time"
          isVisible={this.state.endTimePickerOpen}
          onConfirm={this.props.handleEndTimePicked}
          onCancel={this.hideEndTimePicker}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10
  },
  section: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 15
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

export { ShiftEditor };
