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
    format: date => date.toLocaleDateString()
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
            value: type && type.format ? type.format(student[name]) : student[name]
          }
        : undefined
    )
    .filter(x => x !== undefined);
export { studentToOrderedFieldsAndValues, fieldTypes };
