import React, { Component } from 'react';
import { Container, Content, Textarea, Form, CheckBox, Icon, Title } from 'native-base';
import { View, StyleSheet, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const INITIAL_STATE = { comments: '' };

class GroupActivityDetailsScene extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: <Button onPress={navigation.state.params.onSave} title="שמור" />
    };
  };

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSave: this.onSave });
  }

  onSave() {
    const { subtype, groups, returnTo } = this.props.navigation.state.params;
    this.props.navigation.navigate(returnTo || 'MainScene', {
      newActivity: {
        type: 'פעילות קבוצתית',
        subtype,
        comments: this.state.comments,
        groups
      }
    });
  }

  render() {
    const { groupsContainer, groupRow, rowItem } = styles;
    const { subtype, groups } = this.props.navigation.state.params;
    return (
      <Container>
        <Content padder>
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
                  <TouchableOpacity style={{ flexDirection: 'row-reverse' }}>
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
