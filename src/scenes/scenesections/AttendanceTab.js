import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Container, Button, Text, Icon } from 'native-base';

const activities = [
  { shortTitle: 'פעילות א׳', key: 1 },
  { shortTitle: 'פעילות ב׳', key: 2 },
  { shortTitle: 'פעילות ג׳', key: 3 }
];
const AttendanceTab = () => {
  return (
    <Container style={styles.container}>
      <Container style={styles.section}>
        <Button>
          <Icon name="calendar" />
          <Text>עריכת נוכחות</Text>
        </Button>
      </Container>
      <Container style={styles.section}>
        <Icon name="create" style={{ fontSize: 20, color: 'blue', paddingTop: 5 }} />
        <Text style={styles.time}>08:00</Text>
        <Button>
          <Text>כניסה</Text>
        </Button>
      </Container>
      <Container style={styles.section}>
        <Text style={styles.time}>--:--</Text>
        <Button>
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
    </Container>
  );
};

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
