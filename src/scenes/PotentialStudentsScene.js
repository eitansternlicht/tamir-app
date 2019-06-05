import React from 'react';
import { Container } from 'native-base';
import { FilterableList } from '../components';

const students = {
  studentA_UID: { 'שם פרטי': 'חניך א׳' },
  studentB_UID: { 'שם פרטי': 'חניך ב׳' },
  studentC_UID: { 'שם פרטי': 'חניך ג׳' },
  studentD_UID: { 'שם פרטי': 'חניך ד׳' },
  studentE_UID: { 'שם פרטי': 'חניך ה׳' }
};

const PotentialStudentsScene = () => (
  <Container>
    {/* <Header title="חניכים פוטנציאלים" back /> */}
    <FilterableList data={students} />
  </Container>
);

export { PotentialStudentsScene };
