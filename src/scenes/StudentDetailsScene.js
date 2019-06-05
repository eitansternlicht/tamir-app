import React from 'react';
import { Button } from 'react-native';
import { Container, Content, Fab, Icon } from 'native-base';
import { StudentDetails } from '../components';
import { getStudentName } from '../utils/student/student-utils';

class StudentDetailsScene extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: getStudentName(navigation.state.params.student),
      headerRight: (
        <Button
          onPress={() =>
            navigation.navigate('EditStudentDetailsScene', {
              student: navigation.state.params.student
            })
          }
          title="ערוך"
        />
      )
    };
  };

  render() {
    return (
      <Content>
        <StudentDetails student={this.props.navigation.state.params.student} />
      </Content>
    );
  }
}

export { StudentDetailsScene };
