import React from 'react';
import { Container } from 'native-base';
import { FilterableList } from '../components';
import { groupsWithStudentDetails } from '../utils/firebase-utils';

class ChooseStudentScene extends React.PureComponent {
  static navigationOptions = {
    title: 'בחירת חניך'
  };

  render() {
    return (
      <Container>
        <FilterableList
          withCategories
          data={groupsWithStudentDetails(this.props.navigation.state.params.db)}
          onPress={student =>
            this.props.navigation.navigate('EditDiscussionDetailsScene', { student })
          }
        />
      </Container>
    );
  }
}

export { ChooseStudentScene };
