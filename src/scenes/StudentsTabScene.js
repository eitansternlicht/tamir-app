import React from 'react';
import { View } from 'react-native';
import { FilterableList, Fab } from '../components';

const StudentsTabScene = ({ navigation, db }) => {
  return (
    <View style={{ flex: 1 }}>
      <FilterableList
        withCategories
        data={db}
        onPress={student => {
          navigation.navigate('StudentDetailsScene', { student });
        }}
      />
      <Fab
        position="bottomLeft"
        backgroundColor="#5067FF"
        iconName="edit"
        type="MaterialIcons"
        buttons={[
          {
            onPress: () => navigation.navigate('ManageGroupsScene', { db }),
            backgroundColor: '#3B5998',
            name: 'people'
          },
          { onPress: undefined, backgroundColor: '#34A34F', name: 'person' }
        ]}
      />
    </View>
  );
};

export { StudentsTabScene };
