import React from 'react';
import { Button } from 'react-native';
import GlobalFont from 'react-native-global-font';
import { StudentForm } from '../components';
import { stripNonPermittedFields, formattedStudentToStudent } from '../utils/student/student-utils';
import { updateDoc } from '../utils/firebase/firebase-db';

class EditStudentDetailsScene extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button
          onPress={() =>
            navigation.navigate('EditStudentDetailsScene', {
              student: navigation.state.params.student
            })
          }
          title="שמור"
        />
      )
    };
  };

  componentDidMount() {
    const fontName = 'Assistant-Bold';
    GlobalFont.applyGlobal(fontName);
  }

  render() {
    return (
      <StudentForm
        onSubmit={newStudent => {
          updateDoc(
            'Students',
            newStudent.studentUID,
            formattedStudentToStudent(stripNonPermittedFields(newStudent))
          );
          console.log(
            `updating Students collection doc: ${newStudent.studentUID}, to`,
            newStudent,
            'stripped',
            formattedStudentToStudent(stripNonPermittedFields(newStudent))
          );
          console.log('navigating to MainScene');
          this.props.navigation.navigate('MainScene');
        }}
        student={this.props.navigation.state.params.student}
      />
    );
  }
}

export { EditStudentDetailsScene };
