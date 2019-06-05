import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Input, Item, Label, Icon, Container, Button, Footer, Text } from 'native-base';
import { Formik } from 'formik';
import { right } from '../utils/style-utils';
import { studentToOrderedFieldsAndValues } from '../utils/student/student-utils';
import { entriesToObj } from '../utils/general-utils';
import { FormikDatePicker } from '.';

const validateFieldItem = fieldItem => {
  if (!fieldItem.type || !fieldItem.type.validate) return { valid: true };
  return fieldItem.type.validate(fieldItem.value);
};

const validateForm = student => {
  console.log('validation!');
  const fieldItems = studentToOrderedFieldsAndValues(student);
  return entriesToObj(
    fieldItems
      .map(fieldItem => {
        const { valid, errorMsg } = validateFieldItem(fieldItem);
        if (valid) return undefined;
        return [fieldItem.field, errorMsg];
      })
      .filter(x => x !== undefined)
  );
};

const toInput = ({ values, errors, handleChange, handleBlur }) => fieldItem => {
  // console.log('fieldItem', fieldItem);
  if (fieldItem.type === 'DATE') {
    return (
      <Item
        style={styles.fieldItem}
        key={fieldItem.field}
        // error={!!errors[fieldItem.field]}
      >
        <FormikDatePicker label="תאריך לידה" name="תאריך לידה" />
        {/* <Label styles={styles.formLabel}>{fieldItem.field}</Label>
        <Input
          style={styles.formItem}
          name={fieldItem.field}
          type={fieldItem.type ? fieldItem.type.inputType : undefined}
          onChangeText={handleChange(fieldItem.field)}
          onBlur={handleBlur(fieldItem.field)}
          value={
            fieldItem.type && fieldItem.type.format
              ? fieldItem.type.format(values[fieldItem.field])
              : values[fieldItem.field]
          }
        /> */}
        {/* {errors[fieldItem.field] ? <Icon name="exclamation-circle" type="FontAwesome" /> : <View />} */}
      </Item>
    );
  }
  return (
    <Item style={styles.fieldItem} key={fieldItem.field} error={!!errors[fieldItem.field]}>
      <Label styles={styles.formLabel}>{fieldItem.label}</Label>
      <Input
        style={styles.formItem}
        name={fieldItem.field}
        type={fieldItem.type ? fieldItem.type.inputType : undefined}
        onChangeText={handleChange(fieldItem.field)}
        onBlur={handleBlur(fieldItem.field)}
        value={
          fieldItem.type && fieldItem.type.format
            ? fieldItem.type.format(values[fieldItem.field])
            : values[fieldItem.field]
        }
      />
      {errors[fieldItem.field] ? <Icon name="exclamation-circle" type="FontAwesome" /> : <View />}
    </Item>
  );
};

const StudentForm = props => {
  return (
    <Formik
      initialValues={props.student}
      validate={validateForm}
      onSubmit={(values, { setSubmitting }) => {
        props.onSubmit(values);
        setSubmitting(false);
      }}>
      {_props => (
        <Container>
          <ScrollView>
            {studentToOrderedFieldsAndValues(_props.values).map(toInput(_props))}
          </ScrollView>
          <Footer>
            <Button onPress={_props.handleSubmit}>
              <Text>שמור</Text>
            </Button>
          </Footer>
        </Container>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formLabel: {
    textAlign: right
  },
  formItem: {
    paddingRight: 10,
    textAlign: right
  },
  fieldItem: {
    flexDirection: 'row-reverse'
  }
});
export { StudentForm };
