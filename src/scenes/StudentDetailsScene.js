import React from 'react';
import { Container, Fab, Icon } from 'native-base';
import { StudentDetails } from '../components';
import { getStudentName } from '../utils/student-utils';

class StudentDetailsScene extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: getStudentName(navigation.state.params.student)
    };
  };

  render() {
    return (
      <Container>
        <Fab active style={{ backgroundColor: '#5067FF' }} position="bottomLeft">
          <Icon name="edit" type="MaterialIcons" />
        </Fab>
        <StudentDetails student={this.props.navigation.state.params.student} />
      </Container>
    );
  }
}

export { StudentDetailsScene };
