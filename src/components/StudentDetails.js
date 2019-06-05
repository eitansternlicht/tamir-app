import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Content } from 'native-base';
import { studentToOrderedFieldsAndValues } from '../utils/student/student-utils';
import { right } from '../utils/style-utils';

const StudentDetails = ({ student }) => (
  <Content style={{ flexDirection: 'column' }}>
    {studentToOrderedFieldsAndValues(student).map(({ field, value, label }) => (
      <View key={field} style={{ flexDirection: 'row-reverse' }}>
        <Text style={styles.fieldName}>{label}</Text>
        <Text style={styles.fieldValues}>{value}</Text>
      </View>
    ))}
  </Content>
);

const styles = StyleSheet.create({
  fieldName: {
    textAlign: right,
    fontSize: 19,
    paddingVertical: 10,
    paddingRight: 10,
    alignSelf: 'center',
    width: 135
  },
  fieldValues: {
    alignSelf: 'center',
    textAlign: right,
    fontSize: 19,
    paddingVertical: 10
  }
});

export { StudentDetails };
