const studentFieldsOrder = [
  'lastName',
  'firstName',
  'groups',
  'phone',
  'gender',
  'schoolGrade',
  'school',
  'address',
  'neighborhood',
  'dob',
  'govID',
  'city',
  'email',
  'shirtSize',
  'friends',
  'socialCircle',
  'youthGroup',
  'interests',
  'specialIssues',
  'prefferedDays',
  'staffMemberAppointed',
  'comments'
];

const required = str => ({ valid: str, errorMsg: 'שדה חובה' });
const showMaybe = maybe => maybe || '';

const types = {
  FIRST_NAME: { validate: required },
  LAST_NAME: { validate: required },
  PHONE: {
    validate: str => ({ valid: true, errorMsg: 'מספר פלאפון לא חוקי' }),
    inputType: 'phone'
  },
  SCHOOL_GRADE: {
    valuesAnd: [
      {
        title: 'כיתה',
        valuesOr: ['יב', 'יא', 'י', 'ט', 'ח', 'ז', 'ו', 'ה', 'ד', 'ג', 'ב', 'א']
      },
      { title: 'מס׳', valuesOr: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    ],
    format: gradeNum => (gradeNum ? `${showMaybe(gradeNum[0])} ${showMaybe(gradeNum[1])}` : ''),
    fromFormat: str => (str ? str.split(' ').slice(0, 2) : undefined)
  },
  GENDER: { valuesOr: ['זכר', 'נקבה'] },
  DATE: {
    validate: str => ({ valid: true, errorMsg: 'תאריך לא חוקי' }),
    format: date => (date ? date.toDate().toLocaleDateString() : ''),
    fromFormat: str => (str ? Date.parse(str) : undefined),
    inputType: 'datetime-local'
  },
  GOV_ID: { validate: str => (str ? { valid: true, errorMsg: 'ת.ז. לא חוקית' } : required(str)) },
  EMAIL: {
    inputType: 'email',
    validate: str => ({
      valid: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(str),
      // valid: false,
      errorMsg: 'כתובת אימייל לא חוקית'
    })
  },
  SHIRT_SIZE: { valuesOr: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] }
};

const studentFields = {
  lastName: {
    label: 'שם משפחה',
    type: 'LAST_NAME'
  },
  firstName: {
    label: 'שם פרטי',
    type: 'FIRST_NAME'
  },
  groups: {
    label: 'קבוצות'
  },
  phone: {
    label: 'נייד',
    phone: 'PHONE'
  },
  gender: {
    label: 'מין',
    gender: 'GENDER'
  },
  schoolGrade: {
    label: 'כיתה',
    type: 'SCHOOL_GRADE'
  },
  school: {
    label: 'מוסד לימודים'
  },
  address: {
    label: 'כתובת'
  },
  neighborhood: {
    label: 'שכונה'
  },
  dob: {
    label: 'תאריך לידה',
    type: 'DATE'
  },
  govID: {
    label: 'תעודת זהות',
    type: 'GOV_ID'
  },
  city: {
    label: 'עיר'
  },
  email: {
    label: 'מייל',
    type: 'EMAIL'
  },
  shirtSize: {
    label: 'מידת חולצה',
    type: 'SHIRT_SIZE'
  },
  friends: {
    label: 'חברים'
  },
  socialCircle: {
    label: 'מעגל חברתי'
  },
  youthGroup: {
    label: 'תנועת נוער'
  },
  interests: {
    label: 'תחומי עניין'
  },
  specialIssues: {
    label: 'בעיות מיוחדות'
  },
  prefferedDays: {
    label: 'ימים מועדפים'
  },
  staffMemberAppointed: {
    label: 'איש צוות מטפל'
  },
  comments: {
    label: 'הערות'
  }
};

export { studentFieldsOrder, studentFields, types };
