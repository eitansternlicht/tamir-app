const fieldTypes = {
  PHONE: { validate: undefined, errorMsg: 'מספר פלאפון לא חוקי' },
  SCHOOL_GRADE: {
    valuesAnd: [
      { valuesOr: ['יב', 'יא', 'י', 'ט', 'ח', 'ז', 'ו', 'ה', 'ד', 'ג', 'ב', 'א'] },
      { valuesOr: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    ],
    format: ([grade, num]) => `${grade} ${num}`
  },
  GENDER: { valuesOr: ['זכר', 'נקבה'] },
  DATE: {
    validate: undefined,
    errorMsg: 'תאריך לא חוקי',
    format: date => date.toDate().toLocaleDateString()
  },
  GOV_ID: { validate: undefined, errorMsg: 'ת.ז. לא חוקית' },
  EMAIL: { validate: undefined, errorMsg: 'כתובת אימייל לא חוקית' },
  SHIRT_SIZE: { valuesOr: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] }
};

const studentFirstFields = [
  { name: 'שם משפחה' },
  { name: 'שם פרטי' },
  { name: 'קבוצות' },
  { name: 'נייד', type: fieldTypes.PHONE },
  { name: 'מין', type: fieldTypes.GENDER },
  { name: 'כיתה', type: fieldTypes.SCHOOL_GRADE },
  { name: 'מוסד לימודים' },
  { name: 'כתובת' },
  { name: 'שכונה' },
  { name: 'תאריך לידה', type: fieldTypes.DATE },
  { name: 'תעודת זהות', type: fieldTypes.GOV_ID },
  { name: 'עיר' },
  { name: 'מייל', type: fieldTypes.EMAIL },
  { name: 'מידה חולצה', type: fieldTypes.SHIRT_SIZE },
  { name: 'חברים' },
  { name: 'מעגל חברתי' },
  { name: 'תנועת נוער' },
  { name: 'תחומי עניין' },
  { name: 'בעיות מיוחדות' },
  { name: 'ימים מועדפים' },
  { name: 'איש צוות מטפל' }
];

const studentLastFields = [{ name: 'הערות' }];

const studentFieldOrdering = studentFirstFields.concat(studentLastFields);

const studentToOrderedFieldsAndValues = student =>
  studentFieldOrdering
    .map(({ name, type }) =>
      student[name]
        ? {
            field: name,
            type,
            value: type && type.format ? type.format(student[name]) : student[name]
          }
        : undefined
    )
    .filter(x => x !== undefined);

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

const getStudentName = ({ 'שם משפחה': lastName, 'שם פרטי': firstName }) =>
  `${firstName} ${lastName || ''}`;

const normalizeData = (withCategories, multiselect, data) => {
  const flattened = withCategories ? toFlatGroups(data) : toFlatStudents(data);
  return !multiselect ? flattened : flattened.map(obj => ({ ...obj, selected: false }));
};

const anyFieldsInclude = (searchText, map, fields) =>
  fields.map(field => map[field] && map[field].includes(searchText)).filter(includes => includes)
    .length !== 0;

const filterBy = (searchText, studentFields, data) =>
  data
    .filter(
      student =>
        searchText === '' ||
        student.categoryName ||
        anyFieldsInclude(searchText, student, studentFields)
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
  studentToOrderedFieldsAndValues,
  fieldTypes,
  getStudentName,
  normalizeData,
  filterBy,
  getUniqueKey
};
