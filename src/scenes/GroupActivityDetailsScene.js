import React, { Component } from 'react';
import {
  Container,
  Content,
  Textarea,
  Form,
  CheckBox,
  Icon,
  Title,
  Button as NBButton,
  Text
} from 'native-base';
import { View, StyleSheet, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GlobalFont from 'react-native-global-font';

class GroupActivityDetailsScene extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: <Button onPress={navigation.state.params.onSave} title="שמור" />
    };
  };

  constructor(props) {
    super(props);
    const { comments } = props.navigation.state.params;
    this.state = {
      comments: comments || ''
    };
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSave: this.onSave });
    const fontName = 'Assistant-Bold';
    GlobalFont.applyGlobal(fontName);
  }

  onSave() {
    const {
      subtype,
      groups,
      returnTo,
      actionType,
      editedActivityIndex
    } = this.props.navigation.state.params;
    if (actionType === 'newActivity')
      this.props.navigation.navigate(returnTo || 'MainScene', {
        newActivity: {
          type: 'פעילות קבוצתית',
          subtype,
          comments: this.state.comments,
          groups
        },
        actionType
      });
    else if (actionType === 'editActivity') {
      this.props.navigation.navigate(returnTo || 'MainScene', {
        editedActivity: {
          type: 'פעילות קבוצתית',
          subtype,
          comments: this.state.comments,
          groups
        },
        actionType,
        editedActivityIndex
      });
    }
  }

  render() {
    const { groupsContainer, groupRow, rowItem } = styles;
    const {
      subtype,
      groups,
      actionType,
      returnTo,
      editedActivityIndex
    } = this.props.navigation.state.params;
    return (
      <Container>
        <Content padder>
          {actionType === 'editActivity' ? (
            <NBButton
              onPress={() => {
                this.props.navigation.navigate(returnTo || 'MainScene', {
                  editedActivityIndex,
                  actionType: 'deleteActivity'
                });
              }}
              danger
              style={{ alignSelf: 'flex-end', marginBottom: 30 }}>
              <Text>מחיקת פעילות</Text>
            </NBButton>
          ) : (
            <View />
          )}
          <Title style={{ color: 'black' }}>{subtype}</Title>
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
            {groups.map(({ uid, groupName, attended, participants }, index) => (
              <View key={uid} style={groupRow}>
                <TouchableOpacity
                  onPress={() => {
                    if (attended) {
                      groups[index].attended = !groups[index].attended;
                      for (let i = 0; i < groups[index].participants.length; i += 1)
                        groups[index].participants[i].attended = false;
                      this.props.navigation.navigate('GroupActivityDetailsScene', {
                        subtype,
                        groups
                      });
                    } else {
                      this.props.navigation.navigate('GroupParticipantsAttendanceScene', {
                        groups,
                        index
                      });
                    }
                  }}>
                  <CheckBox style={[rowItem, { marginHorizontal: 10 }]} checked={attended} />
                  <Text style={rowItem}>{groupName}</Text>
                </TouchableOpacity>
                {attended ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('GroupParticipantsAttendanceScene', {
                        groups,
                        index
                      });
                    }}
                    style={{ flexDirection: 'row-reverse' }}>
                    <Text>{groupName}: </Text>
                    <Text>
                      חניכים {participants.filter(({ attended }) => attended).length}/
                      {participants.length}
                    </Text>
                    <Icon
                      name="create"
                      style={{ fontSize: 20, color: 'blue', paddingTop: 5, paddingRight: 5 }}
                    />
                  </TouchableOpacity>
                ) : (
                  <View />
                )}
              </View>
            ))}
          </View>
        </Content>
        {/* <Footer>
          <Button style={[button, { justifyContent: 'center' }]} onPress={this.onSave}>
            <Text
              onPress={this.onSave}
              style={{
                fontSize: 30,
                textAlign: 'center',
                paddingHorizontal: 20,
                color: 'white'
              }}>
              שמור
            </Text>
          </Button>
        </Footer> */}
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
    marginRight: 10,
    flexDirection: 'row-reverse'
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 5
  },

  textStyle: {
    fontSize: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: 'white'
  }
});

export { GroupActivityDetailsScene };
