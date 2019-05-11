/* eslint-disable no-unused-vars */
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {
  MainScene,
  AttendanceCalendarScene,
  StudentDetailsScene,
  GroupParticipantsAttendanceScene,
  GroupActivityDetailsScene,
  PotentialStudentsScene,
  SelectMultipleStudentsScene,
  ManageGroupParticipantsScene,
  ChooseStudentScene,
  ChooseActivityTypeScene,
  EditDiscussionDetailsScene,
  LogInScene
} from './scenes';

const AppContainer = createAppContainer(
  createStackNavigator(
    {
      LogInScene,
      MainScene,
      StudentDetailsScene,
      ChooseActivityTypeScene,
      EditDiscussionDetailsScene,
      ChooseStudentScene,
      AttendanceCalendarScene
    },
    {
      initialRouteName: 'LogInScene',
      headerLayoutPreset: 'center'
    }
  )
);

const App = () => <AppContainer />;

export default App;
