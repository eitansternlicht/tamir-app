import React from 'react';
import { View } from 'react-native';
import { FilterableList, Fab } from '../components';
import { groupsWithStudentDetails } from '../utils/firebase-utils';

class StudentsTabScene extends React.Component {
  // static navigationOptions = {
  //   title: 'טמיר'
  // };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FilterableList
          withCategories
          data={groupsWithStudentDetails(this.props.navigation.state.params.db)}
          onPress={student => {
            this.props.navigation.navigate('StudentDetailsScene', { student });
          }}
        />
        <Fab
          position="bottomLeft"
          backgroundColor="#5067FF"
          iconName="edit"
          type="MaterialIcons"
          buttons={[
            {
              onPress: () => 
                this.props.navigation.navigate('ManageGroupsScene', {
                  db: this.props.navigation.state.params.db
                }),
              backgroundColor: '#3B5998',
              name: 'people'
            },
            { onPress: undefined, backgroundColor: '#34A34F', name: 'person' }
          ]}
        />
      </View>
    );
  }
}

export { StudentsTabScene };
