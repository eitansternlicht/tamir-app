import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import { Container, Content, Textarea, Form, Icon, Body } from 'native-base';
import { right } from '../utils/style-utils';
import { getStudentName } from '../utils/student/student-utils';

const showStudent = student => (
  <Text style={styles.studentName}>
    {student ? getStudentName(student) : 'בחירת חניך'}
    {student ? <Icon type="Entypo" size={20} name="edit" /> : <Icon name="person-add" />}
  </Text>
);

class EditDiscussionDetailsScene extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.groupName,
      headerRight: (
        <Button
          disabled={!navigation.getParam('student')}
          onPress={navigation.state.params.onSave}
          title="שמור"
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      comments: ''
    };
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSave: this.onSave });
  }

  onSave() {
    const { student, subtype, returnTo } = this.props.navigation.state.params;
    if (student) {
      this.props.navigation.navigate(returnTo || 'MainScene', {
        newActivity: {
          type: 'שיחה אישית',
          subtype,
          student: {
            uid: student.studentUID,
            fullName: getStudentName(student)
          },
          comments: this.state.comments
        }
      });
    } else {
      // TODO
      console.log('No Student was Picked! This WILL BE a dialog');
    }
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Text style={styles.titleName}>{this.props.navigation.state.params.subtype}</Text>
          <Body style={styles.messageBox}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.push('ChooseStudentScene', {
                  db: this.props.navigation.state.params.db
                })
              }>
              {showStudent(this.props.navigation.state.params.student)}
            </TouchableOpacity>
          </Body>

          <Form style={{ padding: 10 }}>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="הערות השיחה"
              value={this.state.comments}
              onChangeText={text => this.setState({ comments: text })}
            />
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    textAlign: right
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    textAlign: right
  },
  groupName: {
    fontSize: 25,
    color: '#666666',
    paddingVertical: 10,
    paddingRight: 10,
    backgroundColor: '#f6f6f6',
    textAlign: right
  },
  titleName: {
    paddingVertical: 10,
    paddingRight: 10,
    textDecorationLine: 'underline',
    fontSize: 25,
    textAlign: right
  },
  studentName: {
    fontSize: 18,
    paddingVertical: 10,
    paddingRight: 10,
    textAlign: right,
    marginLeft: 'auto'
  },
  spaceAtTheEnd: {
    height: 100
  },

  messageBox: {
    textAlign: right,
    marginLeft: 'auto'
  },

  afterSubmit: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150
  },

  messageTextDysplay: {
    fontSize: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: 'white'
  }
});

export { EditDiscussionDetailsScene };
