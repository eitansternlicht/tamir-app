import firebase from 'firebase/app';
import 'firebase/firestore';

import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
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
import { right } from '../utils/style-utils';

const INITIAL_STATE = {
  participants: [],
  allSelected: false,
  loading: true
};

class GroupParticipantsAttendanceScene extends React.Component {
  constructor(props) {
    super(props);
    const { selectedGroupID, activityID } = props;
    this.selectAll = this.selectAll.bind(this);
    this.onPressCheckboxOnListItem = this.onPressCheckboxOnListItem.bind(this);
    this.state = INITIAL_STATE;
    const db = firebase.firestore();
    db.collection('Activities')
      .doc(activityID)
      .get()
      .then(doc => {
        this.setState({
          participants: doc
            .data()
            .groups.filter(({ groupID }) => selectedGroupID === groupID.id)[0]
            .participants.map(p => ({ ...p, studentID: p.studentID.id }))
        });
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
  }

  onPressCheckboxOnListItem(item) {
    const { participants, allSelected } = this.state;
    this.setState({
      participants: update(participants, {
        [participants.indexOf(item)]: {
          arrived: { $set: !item.arrived }
        }
      }),
      allSelected: item.arrived && allSelected ? !allSelected : allSelected
    });
  }

  selectAll() {
    const { participants, allSelected } = this.state;
    this.setState({
      participants: participants.map(p => ({
        ...p,
        arrived: !allSelected
      })),
      allSelected: !allSelected
    });
  }

  renderCheckMarks({ sid: _sid }) {
    return this.state.previousActivities
      .map(({ startTime, participantsAttended }) => ({
        startTime,
        arrived:
          participantsAttended.filter(({ sid, arrived }) => sid === _sid && arrived).length !== 0
      }))
      .map(({ startTime, arrived }) =>
        arrived ? (
          <Icon
            type="Entypo"
            key={startTime.toJSON()}
            name="check"
            style={styles.previousAttendanceIcons}
          />
        ) : (
          <Icon
            type="Entypo"
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
            <Title>bla</Title>
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
                textAlign: right
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
            // extraData={this.state}
            data={this.state.participants}
            keyExtractor={participant => participant.studentID}
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
                    checked={item.arrived}
                    onPress={() => this.onPressCheckboxOnListItem(item)}
                  />
                </View>
                <Text
                  style={{
                    textAlign: right,
                    marginRight: 30,
                    marginLeft: 100,
                    paddingLeft: 20,
                    paddingTop: 20,
                    paddingBottom: 20
                  }}>
                  {item.studentID}
                </Text>
                {/* <ScrollView
                  horizontal
                  style={{
                    flex: 3,
                    flexDirection: 'row-reverse'
                  }}>
                  {this.renderCheckMarks(item)}
                </ScrollView> */}
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
