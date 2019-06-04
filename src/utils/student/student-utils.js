import { entriesToObj } from '../general-utils';
import { studentFields, types, studentFieldsOrder } from './constants';

/**
 * e.g. toLabel('firstName') === 'שם פרטי'
 *      toLabel('blabla') === undefined
 * @param {String} studentFeild
 */
const toLabel = studentFeild =>
  studentFields[studentFeild] ? studentFields[studentFeild].label : undefined;

const stripNonPermittedFields = student =>
  entriesToObj(
    studentToOrderedFieldsAndValues2(student)
      .map(({ field, value }) => [field, value])
      .concat([['owners', student.owners]])
  );

const formattedStudentToStudent = formattedStudent =>
  entriesToObj(
    studentToOrderedFieldsAndValues2(formattedStudent)
      .map(({ field, type, value }) => [
        field,
        type && type.fromFormat ? type.fromFormat(value) : value
      ])
      .concat([['owners', formattedStudent.owners]])
  );

const studentToOrderedFieldsAndValues2 = student =>
  studentFieldsOrder.map(field => ({
    field,
    label: studentFields[field].label,
    type: studentFields[field].type,
    value:
      student[field] && studentFields[field].type && types[studentFields[field].type].format
        ? types[studentFields[field].type].format(student[field])
        : student[field]
  }));

const toFlatGroups = groups =>
  Object.keys(groups)
    .map(groupUID =>
      [{ groupUID, categoryName: groups[groupUID].name }].concat(
        Object.keys(groups[groupUID].participants).map(studentUID => ({
          groupUID,
          groupName: groups[groupUID].name,
          studentUID,
          ...groups[groupUID].participants[studentUID]
        }))
      )
    )
    .reduce((acc, curr) => acc.concat(curr));

const toFlatStudents = students =>
  Object.keys(students).map(studentUID => ({ ...students[studentUID], studentUID }));

const getStudentName = ({ lastName, firstName }) => `${firstName} ${lastName || ''}`;

const normalizeData = (withCategories, multiselect, data) => {
  const flattened = withCategories ? toFlatGroups(data) : toFlatStudents(data);
  return !multiselect ? flattened : flattened.map(obj => ({ ...obj, selected: false }));
};

const anyFieldsInclude = (searchText, map, fields) =>
  fields.map(field => map[field] && map[field].includes(searchText)).filter(includes => includes)
    .length !== 0;

const filterBy = (searchText, fields, data) =>
  data
    .filter(
      student =>
        searchText === '' || student.categoryName || anyFieldsInclude(searchText, student, fields)
    )
    .filter(
      (elem, i, arr) =>
        !elem.categoryName || (arr[i + 1] && arr[i + 1].groupName === elem.categoryName)
    );

const getUniqueKey = withCategories => elem => {
  if (!withCategories) return elem.studentUID;
  if (elem.categoryName) return elem.categoryName;
  return elem.groupUID + elem.studentUID;
};

export {
  studentToOrderedFieldsAndValues2,
  getStudentName,
  normalizeData,
  filterBy,
  getUniqueKey,
  stripNonPermittedFields,
  formattedStudentToStudent
};
