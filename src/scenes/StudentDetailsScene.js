import React from 'react';
import { Container, Fab } from 'native-base';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
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
          <MDIcon name="edit" />
        </Fab>
        <StudentDetails student={this.props.navigation.state.params.student} />
      </Container>
    );
  }
}

export { StudentDetailsScene };
