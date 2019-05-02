import React from 'react';
import { Container, Header, Left, Right, Body, Icon, Button, Title, Fab } from 'native-base';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import { StudentDetails } from '../components';
import { getStudentName } from '../utils/student-utils';

const student = {
  sid: 'a',
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
        <Title>{getStudentName(student)}</Title>
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
    <StudentDetails student={student} />
  </Container>
);

export { StudentDetailsScene };
