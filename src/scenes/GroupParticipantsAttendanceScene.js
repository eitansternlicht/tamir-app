import React from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import update from 'immutability-helper';
import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Text,
  Footer,
  CheckBox
} from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const INITIAL_STATE = {
  previousActivities: [
    {
      startTime: new Date(2019, 3, 20),
      participantsAttended: [
        {
          sid: 'a',
          firstName: 'student A',
          attended: true
        },
        {
          sid: 'b',
          firstName: 'student B',
          attended: true
        },
        {
          sid: 'c',
          firstName: 'student C',
          attended: true
        }
      ]
    },
    {
      startTime: new Date(2019, 3, 3),
      participantsAttended: [
        {
          sid: 'a',
          firstName: 'student A',
          attended: true
        },
        {
          sid: 'b',
          firstName: 'student B',
          attended: true
        }
      ]
    },
    {
      startTime: new Date(2019, 2, 15),
      participantsAttended: [
        {
          sid: 'a',
          firstName: 'student A',
          attended: true
        },
        {
          sid: 'c',
          firstName: 'student B',
          attended: true
        }
      ]
    }
  ],
  groupParticipants: [
    {
      sid: 'a',
      firstName: 'חניך א׳',
      attended: false
    },
    {
      sid: 'b',
      firstName: 'חניך ב׳',
      attended: false
    },
    {
      sid: 'c',
      firstName: 'חניך ג׳',
      attended: false
    }
  ],
  allSelected: false
};

class GroupParticipantsAttendanceScene extends React.Component {
  constructor(props) {
    super(props);
    this.selectAll = this.selectAll.bind(this);
    this.onPressCheckboxOnListItem = this.onPressCheckboxOnListItem.bind(this);
    this.state = INITIAL_STATE;
  }

  onPressCheckboxOnListItem(item) {
    const { groupParticipants, allSelected } = this.state;
    this.setState({
      groupParticipants: update(groupParticipants, {
        [groupParticipants.indexOf(item)]: {
          attended: { $set: !item.attended }
        }
      }),
      allSelected: item.attended && allSelected ? !allSelected : allSelected
    });
  }

  selectAll() {
    const { groupParticipants, allSelected } = this.state;
    this.setState({
      groupParticipants: groupParticipants.map(p => ({
        ...p,
        attended: !allSelected
      })),
      allSelected: !allSelected
    });
  }

  renderCheckMarks({ sid: _sid }) {
    return this.state.previousActivities
      .map(({ startTime, participantsAttended }) => ({
        startTime,
        attended:
          participantsAttended.filter(({ sid, attended }) => sid === _sid && attended).length !== 0
      }))
      .map(({ startTime, attended }) =>
        attended ? (
          <EntypoIcon
            key={startTime.toJSON()}
            name="check"
            style={styles.previousAttendanceIcons}
          />
        ) : (
          <EntypoIcon
            key={startTime.toJSON()}
            name="minus"
            style={styles.previousAttendanceIcons}
          />
        )
      );
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.groupName}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View
            style={{
              height: 70,
              flexDirection: 'row-reverse',
              borderBottomWidth: 1,
              borderBottomColor: 'grey'
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text
                style={{
                  fontWeight: 'bold'
                }}>
                נוכחות
              </Text>
              <CheckBox
                style={{ marginTop: 5, marginRight: 10 }}
                checked={this.state.allSelected}
                onPress={this.selectAll}
              />
            </View>
            <Text
              style={{
                flex: 3,
                fontWeight: 'bold',
                paddingTop: 10,
                marginRight: 20,
                textAlign: 'right'
              }}>
              שם החניך
            </Text>
            <Text
              style={{
                flex: 3,
                fontWeight: 'bold',
                alignSelf: 'center',
                textAlign: 'center'
              }}>
              נוכחות בפעילויות הקודמות
            </Text>
          </View>
          <FlatList
            extraData={this.state}
            data={this.state.groupParticipants}
            keyExtractor={groupParticipant => groupParticipant.sid}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: 'row-reverse',
                  borderBottomWidth: 1,
                  borderBottomColor: '#DEE1E8',
                  alignItems: 'center'
                }}>
                <View style={{ alignItems: 'center', marginRight: 17 }}>
                  <CheckBox
                    checked={item.attended}
                    onPress={() => this.onPressCheckboxOnListItem(item)}
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'right',
                    marginRight: 30,
                    marginLeft: 100,
                    paddingLeft: 20,
                    paddingTop: 20,
                    paddingBottom: 20
                  }}>
                  {item.firstName}
                </Text>
                <ScrollView
                  horizontal
                  style={{
                    flex: 3,
                    flexDirection: 'row-reverse'
                  }}>
                  {this.renderCheckMarks(item)}
                </ScrollView>
              </View>
            )}
          />
        </View>
        <Footer>
          <Left>
            <Button style={{ alignSelf: 'flex-start', marginLeft: 10 }}>
              <Text>שמור</Text>
            </Button>
          </Left>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  previousAttendanceIcons: {
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20
  }
});

export { GroupParticipantsAttendanceScene };
