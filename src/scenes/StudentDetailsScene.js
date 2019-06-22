import React from 'react';
import { Button, View } from 'react-native';
import { Container, Content, Button as NBButton, Text } from 'native-base';
import { StudentDetails } from '../components';
import { getStudentName } from '../utils/student/student-utils';
import { removeEmptyFields } from '../utils/general-utils';
import { setStudentStatus } from '../utils/firebase/firebase-db';

class StudentDetailsScene extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const isPotentialStudent = navigation.getParam('previous') === 'PotentialStudentsScene';
    const { student } = navigation.state.params;
    return {
      title: getStudentName(student),
      headerRight: (
        <Button
          onPress={() => {
            if (isPotentialStudent) {
              setStudentStatus(student, 'normal');
              navigation.navigate('PotentialStudentsScene');
            } else
              navigation.navigate('StudentFormScene', {
                actionType: 'editStudent',
                student
              });
          }}
          title={isPotentialStudent ? 'גייס חניך' : 'ערוך'}
        />
      )
    };
  };

  render() {
    const { student, previous } = this.props.navigation.state.params;
    const isPotentialStudent = previous === 'PotentialStudentsScene';
    return (
      <Container>
        <Content>
          <StudentDetails student={removeEmptyFields(student)} />
          {isPotentialStudent ? (
            <NBButton
              danger
              style={{ alignSelf: 'flex-end', margin: 5 }}
              onPress={() => {
                setStudentStatus(student, 'potentialDeleted');
                this.props.navigation.navigate('PotentialStudentsScene');
              }}>
              <Text>החניך לא רלווטני</Text>
            </NBButton>
          ) : (
            <View />
          )}
        </Content>
      </Container>
    );
  }
}

export { StudentDetailsScene };
