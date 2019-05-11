import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Container, Footer, Content, Textarea, Form, Icon, Button, Body } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { right } from '../utils/style-utils';
import { getStudentName } from '../utils/student-utils';

const showStudent = student => (
  <Text style={styles.studentName}>
    {student ? getStudentName(student) : 'בחירת חניך'}
    {student ? <EntypoIcon size={20} name="edit" /> : <Icon name="person-add" />}
  </Text>
);

class EditDiscussionDetailsScene extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      comments: ''
    };
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Text style={styles.titleName}>{this.props.navigation.state.params.data}</Text>
          <Body style={{ textAlign: right, marginLeft: 'auto' }}>
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
        <Footer>
          <Button
            onPress={() => {
              if (this.props.navigation.state.params.student) {
                this.props.navigation.navigate('MainScene', {
                  newActivity: {
                    discussion: {
                      type: this.props.navigation.state.params.data,
                      student: this.props.navigation.state.params.student,
                      comments: this.state.comments
                    }
                  }
                });
              } else {
                console.log('No Student was Picked! This WILL BE a dialog');
              }
            }}
            style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 150 }}>
            <Text style={{ fontSize: 30, textAlign: 'center' }}>שמור</Text>
          </Button>
        </Footer>
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
    fontSize: 25
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
  }
});

export { EditDiscussionDetailsScene };
