import React from 'react';
import { Container, Header, Tabs, Tab, Title, Left, Right, Body, Icon, Button } from 'native-base';
import { appName } from '../../app.json';
import { AttendanceTab, StudentsTab } from './scenesections';

const MainScene = () => (
  <Container>
    <Header hasTabs>
      <Left />
      <Body>
        <Title>{appName}</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name="menu" />
        </Button>
      </Right>
    </Header>
    <Tabs>
      <Tab heading="חניכים">
        <StudentsTab />
      </Tab>
      <Tab heading="נוכחות">
        <AttendanceTab />
      </Tab>
    </Tabs>
  </Container>
);

export { MainScene };
