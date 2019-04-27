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
  Card,
  Button
} from 'native-base';

const StudentDetailsScene = () => (
  <Container>
    <Header>
      <Left>
        <Button transparent>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body />
      <Right>
        <Button transparent>
          <Icon name="menu" />
        </Button>
      </Right>
    </Header>
    <Content>
      <Card style={styles.rtl}>
        <Text style={styles.title}>פרטי חניך ד</Text>
        <View style={styles.rtl}>
          <Button rounded info>
            <Text>Edit</Text>
          </Button>
        </View>
        <Body style={styles.rtl}>
          <Text style={styles.mar}>
            {'\n'} שם: חניך ד {'\n'}
            {'\n'} גיל: 9 {'\n'}
            {'\n'} כיתה: ג {'\n'}
            {'\n'} בית ספר: דוגמא {'\n'}
            {'\n'} שכונה: נחלאות {'\n'}
            {'\n'} עיר: ירושלים {'\n'}
            {'\n'} קבוצה: א{'\n'}
            {'\n'}
          </Text>
        </Body>
      </Card>
    </Content>
  </Container>
);
const styles = StyleSheet.create({
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    alignItems: 'flex-end',
    marginBottom: 30
  },
  activeTitle: {
    color: 'red'
  },
  rtl: {
    alignItems: 'flex-end'
  },
  submitButton: {
    alignItems: 'flex-end'
  },
  mar: {
    paddingLeft: 50,
    paddingRight: 10,
    borderWidth: 1,
    marginTop: 30
  }
});
export { StudentDetailsScene };
