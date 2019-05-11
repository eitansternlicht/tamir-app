import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Title,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Text,
  List,
  ListItem
} from 'native-base';
import { Agenda } from 'react-native-calendars';
import { StyleSheet, Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import { appName } from '../../app.json';
import { formatDate, toClockRange, getDaysInMonth } from '../utils/date-utils';

const rowHasChanged = (r1, r2) =>
  r1.startTime.timestamp !== r2.startTime.timestamp ||
  r1.endTime.timestamp !== r2.endTime.timestamp;

const AGENDA_HEADER_HEIGHT = 104;

const ADD_ITEM = { startTime: true, endTime: true };
const INITIAL_STATE = {
  items: {
    '2019-04-09': [
      {
        startTime: new Date(2019, 3, 9, 8),
        endTime: new Date(2019, 3, 9, 10),
        activities: [
          { kind: 'מפגש עם דמות להזדהות' },
          { kind: 'תהליך תוכן' },
          { kind: 'שיחה אישית' }
        ],
        height: 200
      },
      {
        startTime: new Date(2019, 3, 9, 14),
        endTime: new Date(2019, 3, 9, 16),
        activities: [
          { kind: 'מפגש עם דמות להזדהות' },
          { kind: 'תהליך תוכן' },
          { kind: 'שיחה אישית' }
        ],
        height: 200
      },
      ADD_ITEM
    ],
    '2019-04-10': [
      {
        startTime: new Date(2019, 3, 10, 8),
        endTime: new Date(2019, 3, 10, 19),
        activities: [{ kind: 'שיחה אישית' }],
        height: 100
      },
      ADD_ITEM
    ],
    '2019-04-11': [ADD_ITEM]
  }
};
class AttendanceCalendarScene extends Component {
  static navigationOptions = {
    title: 'עריכת נוכחות'
  };

  constructor(props) {
    super(props);
    this.loadItems = this.loadItems.bind(this);
    this.state = INITIAL_STATE;
  }

  loadItems(month) {
    if (new Date().getTime() >= month.timestamp) {
      // in the past!
      if (!this.state.items[formatDate(new Date(month.timestamp))]) {
        const days = getDaysInMonth(month);
        days.forEach(day => {
          if (!this.state.items[day]) {
            this.state.items[day] = [];
          }
        });
        // eslint-disable-next-line react/no-access-state-in-setstate
        this.setState({ ...this.state });
      }
    }
  }

  renderAddNewItem = () => {
    return (
      <Container
        style={{
          flexDirection: 'column',
          alignItems: 'flex-end',
          height: 100,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderBottomColor: '#BDC0C9',
          borderBottomWidth: 1
        }}>
        <Icon name="add-circle" style={{ paddingTop: 35, paddingRight: 20, color: '#9EA1A8' }} />
        <Container
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 3
          }}
        />
        <Divider style={{ backgroundColor: 'blue', height: 4 }} />
      </Container>
    );
  };

  renderListOfActivities = ({ activities }) => (
    <List>
      {activities.map(activity => (
        <ListItem key={activity.kind}>
          <Text>{activity.kind}</Text>
        </ListItem>
      ))}
    </List>
  );

  renderItem = item => {
    return item.startTime !== true ? (
      <Container style={[styles.item, { height: item.height }]}>
        <Text>{toClockRange(item)}</Text>
        {this.renderListOfActivities(item)}
      </Container>
    ) : (
      this.renderAddNewItem()
    );
  };

  render() {
    return (
      <Container>
        <Content>
          <Agenda
            style={{ height: Dimensions.get('window').height - AGENDA_HEADER_HEIGHT }}
            items={this.state.items}
            loadItemsForMonth={this.loadItems}
            selected="2019-04-09"
            maxDate="2019-04-22"
            renderItem={this.renderItem}
            renderEmptyDate={this.renderAddNewItem}
            rowHasChanged={rowHasChanged}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

export { AttendanceCalendarScene };
