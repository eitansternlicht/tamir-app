import React from 'react';
import { Container, Content, Fab, Icon } from 'native-base';
import { StudentDetails } from '../components';
import { getStudentName } from '../utils/student/student-utils';

class StudentDetailsScene extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: getStudentName(navigation.state.params.student)
    };
  };

  render() {
    return (
      <Container>
        <Content>
          <StudentDetails student={this.props.navigation.state.params.student} />
        </Content>
        <Fab
          onPress={() => {
            this.props.navigation.navigate('EditStudentDetailsScene', {
              student: this.props.navigation.state.params.student
            });
          }}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomLeft">
          <Icon name="edit" type="MaterialIcons" />
        </Fab>
      </Container>
    );
  }
}

export { StudentDetailsScene };
