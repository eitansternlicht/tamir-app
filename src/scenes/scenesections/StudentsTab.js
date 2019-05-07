import React from 'react';
import { View } from 'react-native';
import { FilterableList, Fab } from '../../components';
import { groupsWithStudentDetails } from '../../utils/firebase-utils';

const StudentsTab = props => (
  <View style={{ flex: 1 }}>
    <FilterableList
      withCategories
      data={groupsWithStudentDetails(props.db)}
      onPress={student => {
        props.navigation.navigate('StudentDetailsScene', { student });
      }}
    />
    <Fab
      position="bottomLeft"
      backgroundColor="#5067FF"
      mdIcon="edit"
      buttons={[
        { onPress: undefined, backgroundColor: '#3B5998', name: 'people' },
        { onPress: undefined, backgroundColor: '#34A34F', name: 'person' }
      ]}
    />
  </View>
);

export { StudentsTab };
