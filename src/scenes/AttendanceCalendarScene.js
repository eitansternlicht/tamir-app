import React, { Component } from 'react';
import { Container, Content, Icon, Text, List, ListItem, Button } from 'native-base';
import { Agenda } from 'react-native-calendars';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Divider } from 'react-native-elements';
import {
  formatDate,
  formatYearAndMonth,
  toClockRange,
  getDaysCountInMonth,
  getDaysInMonth
} from '../utils/date-utils';
import { firebase } from '../utils/firebase/firebase-db';
import { entriesToObj } from '../utils/general-utils';

const rowHasChanged = (r1, r2) =>
  r1.startTime.timestamp !== r2.startTime.timestamp ||
  r1.endTime.timestamp !== r2.endTime.timestamp;

const AGENDA_HEADER_HEIGHT = 104;

const ADD_ITEM = { addNewItem: true };
const INITIAL_STATE = {
  monthsLoaded: {
    // '2019-04': true
  },
  // {
  // '2019-04': {
  //    ad
  // }
  // }
  attendanceDays: {}
  // items: {
  //   '2019-04-09': [
  //     {
  //       startTime: new Date(2019, 3, 9, 8),
  //       endTime: new Date(2019, 3, 9, 10),
  //       activities: [
  //         { kind: 'מפגש עם דמות להזדהות' },
  //         { kind: 'תהליך תוכן' },
  //         { kind: 'שיחה אישית' }
  //       ],
  //       height: 200
  //     },
  //     {
  //       startTime: new Date(2019, 3, 9, 14),
  //       endTime: new Date(2019, 3, 9, 16),
  //       activities: [
  //         { kind: 'מפגש עם דמות להזדהות' },
  //         { kind: 'תהליך תוכן' },
  //         { kind: 'שיחה אישית' }
  //       ],
  //       height: 200
  //     },
  //     ADD_ITEM
  //   ],
  //   '2019-04-10': [
  //     {
  //       startTime: new Date(2019, 3, 10, 8),
  //       endTime: new Date(2019, 3, 10, 19),
  //       activities: [{ kind: 'שיחה אישית' }],
  //       height: 100
  //     },
  //     ADD_ITEM
  //   ],
  //   '2019-04-11': [ADD_ITEM]
  // }
};
class AttendanceCalendarScene extends Component {
  constructor(props) {
    super(props);
    this.loadItems = this.loadItems.bind(this);
    this.state = INITIAL_STATE;
  }

  loadItems(month) {
    const date = new Date(month.timestamp);
    console.log('eitan state', this.state);
    if (
      !this.state.monthsLoaded[formatYearAndMonth(date)] &&
      new Date().getTime() >= month.timestamp
    ) {
      const firstOfMonth = new Date(date.getFullYear(), date.getMonth());
      const lastOfMonth = new Date(date.getFullYear(), date.getMonth(), getDaysCountInMonth(date));

      firebase
        .firestore()
        .collection('AttendanceDays')
        .where('owners.tutors', 'array-contains', firebase.auth().currentUser.uid)
        .where('day', '>=', firstOfMonth)
        .where('day', '<=', lastOfMonth)
        .onSnapshot(snapshot => {
          this.setState(prevState => {
            const firebaseAttendanceDays = entriesToObj(
              snapshot.docs.map(doc => {
                const data = doc.data();
                const day = data.day.toDate();
                return [
                  formatDate(day),
                  data.shifts
                    ? data.shifts
                        .sort((a, b) => {
                          if (a.startTime > b.startTime) return 1;
                          if (b.startTime > a.startTime) return -1;
                          return 0;
                        })
                        .map((s, i) => ({
                          ...s,
                          uid: doc.id,
                          day,
                          last: data.shifts.length - 1 === i
                        }))
                    : []
                ];
              })
            );
            const daysInMonth = getDaysInMonth({
              year: date.getFullYear(),
              month: date.getMonth() + 1
            });
            const emptyAttendanceDaysInMonth = entriesToObj(daysInMonth.map(day => [day, []]));
            const attendanceDays = {
              ...emptyAttendanceDaysInMonth,
              ...prevState.attendanceDays,
              ...firebaseAttendanceDays
            };
            console.log('eitan attendanceDays', attendanceDays);

            return {
              monthsLoaded: { ...prevState.monthsLoaded, [formatYearAndMonth(date)]: true },
              attendanceDays
            };
          });
        });
    }
  }

  renderAddNewItem = () => {
    return (
      <Container style={styles.containerAddNewItem}>
        <Button transparent iconRight style={{ alignSelf: 'flex-end', paddingTop: 10 }}>
          <Text>הוספת משמרת</Text>
          <Icon type="MaterialIcons" name="add-circle" />
        </Button>
        <Divider style={styles.dividerAddNewItem} />
      </Container>
    );
  };

  renderListOfActivities = activities => (
    <List>
      {activities.map(activity => (
        <ListItem key={JSON.stringify(activity)}>
          <Text>{`${activity.type} ${activity.subtype}`}</Text>
        </ListItem>
      ))}
    </List>
  );

  renderShift = ({ uid, day, activities, startTime, endTime, last }) => {
    // console.log('eitan startTime', startTime);
    return !last ? (
      <Container style={[styles.item, { height: null }]}>
        <Text>{toClockRange({ startTime: startTime.toDate(), endTime: endTime.toDate() })}</Text>
        {this.renderListOfActivities(activities)}
      </Container>
    ) : (
      <View>
        <Container style={[styles.item, { height: null }]}>
          <Text>{toClockRange({ startTime: startTime.toDate(), endTime: endTime.toDate() })}</Text>
          {this.renderListOfActivities(activities)}
        </Container>
        {this.renderAddNewItem()}
      </View>
    );
  };

  render() {
    return (
      <Container>
        <Content>
          <Agenda
            style={styles.agenda}
            items={this.state.attendanceDays}
            loadItemsForMonth={this.loadItems}
            selected={formatDate(new Date())}
            maxDate={formatDate(new Date())}
            renderItem={this.renderShift}
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
  },

  iconAddItem: {
    paddingTop: 35,
    paddingRight: 20,
    color: '#9EA1A8'
  },

  containerAddNewItem: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderBottomColor: '#BDC0C9',
    borderBottomWidth: 1
  },

  insideContainerAddNewItem: {
    borderBottomColor: 'black',
    borderBottomWidth: 3
  },

  dividerAddNewItem: {
    backgroundColor: 'blue',
    height: 4
  },

  agenda: {
    height: Dimensions.get('window').height - AGENDA_HEADER_HEIGHT
  }
});

export { AttendanceCalendarScene };
