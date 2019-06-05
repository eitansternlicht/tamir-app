import React from 'react';
import { StudentForm } from '../components';
import { stripNonPermittedFields, formattedStudentToStudent } from '../utils/student/student-utils';
import { updateDoc } from '../utils/firebase/firebase-db';

const EditStudentDetailsScene = props => (
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
      props.navigation.navigate('MainScene');
    }}
    student={props.navigation.state.params.student}
  />
);

export { EditStudentDetailsScene };
