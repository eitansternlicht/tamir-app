import React from 'react';
import { Container } from 'native-base';
import { FilterableList, Header } from '../components';

const groups = {
  groupA_UID: {
    name: 'קבוצה א׳',
    students: {
      studentA_UID: { 'שם פרטי': 'חניך א׳' },
      studentB_UID: { 'שם פרטי': 'חניך ב׳' },
      studentC_UID: { 'שם פרטי': 'חניך ג׳' },
      studentD_UID: { 'שם פרטי': 'חניך ד׳' },
      studentE_UID: { 'שם פרטי': 'חניך ה׳' }
    }
  },
  groupB_UID: {
    name: 'קבוצה ב׳',
    students: {
      studentA_UID: { 'שם פרטי': 'חניך א׳' },
      studentF_UID: { 'שם פרטי': 'חניך ו׳' },
      studentG_UID: { 'שם פרטי': 'חניך ז׳' },
      studentH_UID: { 'שם פרטי': 'חניך ח׳' },
      studentI_UID: { 'שם פרטי': 'חניך ט׳' }
    }
  },
  noGroup_UID: {
    name: 'לא בקבוצה',
    students: {
      studentJ_UID: { 'שם פרטי': 'חניך י׳' },
      studentK_UID: { 'שם פרטי': 'חניך יא׳' }
    }
  }
};
const ChooseStudentScene = () => (
  <Container>
    <Header title="בחירת חניך" back />
    <FilterableList
      withCategories
      data={groups}
      onPress={item => console.log('item pressed', item)}
    />
  </Container>
);

export { ChooseStudentScene };
