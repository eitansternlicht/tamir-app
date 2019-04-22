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
  Text
} from 'native-base';
import { Agenda } from 'react-native-calendars';
import { StyleSheet } from 'react-native';
import { appName } from '../../app.json';

const rowHasChanged = (r1, r2) => r1.name !== r2.name;

const timeToString = time => new Date(time).toISOString().split('T')[0];

class AttendanceCalendarScene extends Component {
  constructor(props) {
    super(props);
    this.loadItems = this.loadItems.bind(this);
    this.state = {
      items: {}
    };
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i += 1) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j += 1) {
            this.state.items[strTime].push({
              name: `Item for ${strTime}`,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      // console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem = item => (
    <Container style={[styles.item, { height: item.height }]}>
      <Text>{item.name}</Text>
    </Container>
  );

  renderEmptyDate = () => <Container style={styles.emptyDate} />;

  render() {
    return (
      <Container>
        <Header>
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
        <Content>
          <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems}
            selected="2019-04-23"
            renderItem={this.renderItem}
            renderEmptyDate={this.renderEmptyDate}
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
