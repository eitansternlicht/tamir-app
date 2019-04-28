import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Content,
  Button,
  Title,
  Fab
} from 'native-base';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import { studentToOrderedFieldsAndValues } from '../utils/student-utils';

const student = {
  'שם פרטי': 'חניך',
  'שם משפחה': 'א׳',
  נייד: '050-222-2222',
  מין: 'ז',
  כיתה: ['ג', 4],
  'מוסד לימודים': 'בית ספר דוגמה',
  כתובת: 'הרב שלום שבזי 3',
  שכונה: 'נחלאות',
  'תאריך לידה': new Date(2011, 9, 22),
  'תעודת זהות': '204070635',
  עיר: 'ירושלים',
  מייל: 'student_A@gmail.com',
  'מידה חולצה': 'S',
  חברים: 'נעם, צחי, חיים, דני'
};
const StudentDetailsScene = () => (
  <Container>
    <Header>
      <Left>
        <Button transparent>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>{`${student['שם פרטי']} ${student['שם משפחה']}`}</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name="menu" />
        </Button>
      </Right>
    </Header>
    <Fab active style={{ backgroundColor: '#5067FF' }} position="bottomLeft">
      <MDIcon name="edit" />
    </Fab>
    <Content style={{ flexDirection: 'column' }}>
      {studentToOrderedFieldsAndValues(student).map(({ field, value }) => (
        <View key={field} style={{ flexDirection: 'row-reverse' }}>
          <Text style={styles.fieldName}>{field}</Text>
          <Text style={styles.fieldValues}>{value}</Text>
        </View>
      ))}
    </Content>
  </Container>
);
const styles = StyleSheet.create({
  fieldName: {
    textAlign: 'right',
    fontSize: 19,
    paddingVertical: 10,
    paddingRight: 10,
    alignSelf: 'center',
    width: 135
  },
  fieldValues: {
    alignSelf: 'center',
    textAlign: 'right',
    fontSize: 19,
    paddingVertical: 10
  }
});
export { StudentDetailsScene };
