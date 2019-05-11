/* eslint-disable no-unused-vars */
import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation';
import {
  // MainScene,
  AttendanceTabScene,
  StudentsTabScene,
  AttendanceCalendarScene,
  StudentDetailsScene,
  GroupParticipantsAttendanceScene,
  GroupActivityDetailsScene,
  PotentialStudentsScene,
  SelectMultipleStudentsScene,
  ManageGroupParticipantsScene,
  ManageGroupsScene,
  ChooseStudentScene,
  ChooseActivityTypeScene,
  EditDiscussionDetailsScene,
  LogInScene,
  SettingsScene,
  AuthLoadingScene
} from './scenes';

const StudentsTabStack = createStackNavigator(
  {
    StudentsTabScene: {
      screen: StudentsTabScene
    },
    StudentDetailsScene: {
      screen: StudentDetailsScene
    },
    ManageGroupsScene: {
      screen: ManageGroupsScene
    }
  },
  {
    initialRouteName: 'StudentsTabScene',
    navigationOptions: {
      title: 'חניכים'
    },
    headerMode: 'none'
  }
);

const AttendanceTabStack = createStackNavigator(
  {
    AttendanceTabScene,
    ChooseActivityTypeScene,
    EditDiscussionDetailsScene,
    ChooseStudentScene,
    AttendanceCalendarScene
  },
  {
    initialRouteName: 'AttendanceTabScene',
    navigationOptions: {
      title: 'נוכחות'
    },
    headerMode: 'none'
  }
);

const MainTabs = createMaterialTopTabNavigator(
  {
    StudentsTabStack: {
      screen: StudentsTabStack
    },
    AttendanceTabStack: {
      screen: AttendanceTabStack
    }
  },
  {
    initialRouteName: 'StudentsTabStack',
    order: ['StudentsTabStack', 'AttendanceTabStack'],
    animationEnabled: true,
    navigationOptions: {
      title: 'טמיר'
    }
  }
);

const MainTabsInStack = createStackNavigator({ MainTabsInStack: MainTabs });

const AppWithDrawer = createDrawerNavigator(
  {
    MainTabs: {
      screen: MainTabsInStack
    },
    SettingsScene: {
      screen: SettingsScene
    }
  },
  {
    initialRouteName: 'MainTabs',
    order: ['MainTabs', 'SettingsScene'],
    drawerPosition: 'right'
  }
);

const AuthStack = createStackNavigator({ LogInScene });

const AppWithAuth = createSwitchNavigator(
  {
    AuthLoadingScene,
    AuthStack,
    AppWithDrawer
  },
  { initialRouteName: 'AuthLoadingScene' }
);

export default createAppContainer(AppWithAuth);
