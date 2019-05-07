import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Textarea,
  Form,
  CheckBox,
  Icon,
  Button,
  Footer,
  Title,
  Left,
  Body,
  Right
} from 'native-base';
import { View, StyleSheet, Text } from 'react-native';

const INITIAL_STATE = { comments: '' };

const groupsAttendance = {
  'קבוצה א': [{ attended: true }, { attended: false }, { attended: true }, { attended: true }],
  'קבוצה ב': [{ attended: true }, { attended: true }, { attended: true }, { attended: true }],
  'קבוצה ג': [{ attended: true }, { attended: false }, { attended: false }, { attended: true }],
  'קבוצה ד': [{ attended: false }, { attended: false }, { attended: false }, { attended: false }],
  'קבוצה ה': [{ attended: true }, { attended: true }, { attended: false }, { attended: false }]
};

class GroupActivityDetailsScene extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  // eslint-disable-next-line class-methods-use-this
  renderRow({ groupAttendance, groupName }) {
    const { groupRow, rowItem } = styles;
    const attendedCounter = groupAttendance.filter(({ attended }) => attended).length;
    if (attendedCounter !== 0) {
      return (
        <View key={groupName} style={groupRow}>
          <CheckBox checked style={[rowItem, { marginHorizontal: 10 }]} />
          <Text style={rowItem}>{groupName}</Text>
          <Text style={rowItem}>
            חניכים {attendedCounter}/{groupAttendance.length}
          </Text>
          <Icon
            name="create"
            style={{ fontSize: 20, color: 'blue', paddingTop: 5, paddingRight: 5 }}
          />
        </View>
      );
    }

    return (
      <View key={groupName} style={groupRow}>
        <CheckBox checked style={[rowItem, { marginHorizontal: 10 }]} />
        <Text style={rowItem}>{groupName}</Text>
      </View>
    );
  }

  render() {
    const { groupsContainer, button } = styles;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>פעילות קבוצתית</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <Title style={{ color: 'black' }}>מפגש עם דמות להזדהות</Title>
          <Form style={{ padding: 10 }}>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="תוכן הפעילות"
              value={this.state.comments}
              onChangeText={text => this.setState({ comments: text })}
            />
          </Form>
          <View style={groupsContainer}>
            {Object.keys(groupsAttendance)
              .map(groupName => ({
                groupAttendance: groupsAttendance[groupName],
                groupName
              }))
              .map(this.renderRow)}
          </View>
        </Content>
        <Footer>
          <Button style={[button, { justifyContent: 'center' }]}>
            <Text style={{ fontSize: 35 }}>שמור</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  groupsContainer: {
    flexDirection: 'column'
  },
  groupRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    padding: 5
  },
  rowItem: {
    marginRight: 10
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 5
  }
});

export { GroupActivityDetailsScene };
