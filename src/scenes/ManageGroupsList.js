import React from 'react';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Title,
  Fab,
  Text,
  List,
  ListItem
} from 'native-base';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
// import { right } from '../utils/style-utils'; // path to src/utils/style-utils.js

// eslint-disable-next-line no-unused-vars
const groupList = [
  { groupUID: 'groupA', name: 'קבוצה א׳' },
  { groupUID: 'groupB', name: 'קבוצה ב׳' },
  { groupUID: 'groupC', name: 'קבוצה ג׳' },
  { groupUID: 'groupD', name: 'קבוצה ד׳' }
];
const ManageGroupsList = () => (
  <Container>
    <Header>
      <Left>
        <Button transparent>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title style={styles.textTag}>הקבוצות שלי</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name="menu" />
        </Button>
      </Right>
    </Header>
    <Container>
      <List>
        <ListItem>
          <Text style={styles.textTag}>קבוצה</Text>
        </ListItem>
        <ListItem>
          <Text style={styles.textTag}>קבוצה</Text>
        </ListItem>
        <ListItem>
          <Text style={styles.textTag}>קבוצה</Text>
        </ListItem>
      </List>
    </Container>
    <Fab active style={{ backgroundColor: '#5067FF' }} position="bottomRight">
      <MDIcon name="add" />
    </Fab>
  </Container>
);

const styles = StyleSheet.create({
  textTag: {
    textAlign: 'right'
  }
});

export { ManageGroupsList };
