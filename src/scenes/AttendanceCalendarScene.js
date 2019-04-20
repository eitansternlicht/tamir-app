import React from 'react';
import { Container, Header, Content, Title, Left, Right, Body, Icon, Button } from 'native-base';
import { Agenda } from 'react-native-calendars';
import { Dimensions } from 'react-native';

const AGENDA_HEADER_HEIGHT = 104;
const AttendanceCalendarScene = () => (
  <Container style={{ flex: 1 }}>
    <Header>
      <Left />
      <Body>
        <Title>בחירת יום</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name="menu" />
        </Button>
      </Right>
    </Header>
    <Content>
      <Agenda
        style={{ height: Dimensions.get('window').height - AGENDA_HEADER_HEIGHT }}
        items={{
          '2019-04-22': [{ text: 'item 1 - any js object' }],
          '2019-04-23': [{ text: 'item 2 - any js object' }],
          '2019-04-24': [],
          '2019-04-25': [{ text: 'item 3 - any js object' }, { text: 'any js object' }]
        }}
      />
    </Content>
  </Container>
);

export { AttendanceCalendarScene };
