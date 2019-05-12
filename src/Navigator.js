/* eslint-disable no-unused-vars */
import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation';
import {
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
import MainScene from './scenes/MainScene';

const MainStack = createStackNavigator(
  {
    MainScene: {
      screen: MainScene
    },
    StudentDetailsScene: {
      screen: StudentDetailsScene
    },
    ManageGroupsScene: {
      screen: ManageGroupsScene
    },
    ChooseActivityTypeScene: {
      screen: ChooseActivityTypeScene,
      navigationOptions: {
        title: 'פעילות שבוצעה'
      }
    },
    EditDiscussionDetailsScene: {
      screen: EditDiscussionDetailsScene,
      navigationOptions: {
        title: 'שיחה אישית'
      }
    },
    ChooseStudentScene,
    GroupActivityDetailsScene: {
      screen: GroupActivityDetailsScene,
      navigationOptions: {
        title: 'פעילות קבוצתית'
      }
    },
    AttendanceCalendarScene: {
      screen: AttendanceCalendarScene,
      navigationOptions: {
        title: 'נוכחות קודמת'
      }
    }
  },
  {
    initialRouteName: 'MainScene',
    navigationOptions: {
      title: 'חניכים'
    }
  },
  {
    headerMode: 'none'
  }
);

// const AttendanceTabStack = createStackNavigator(
//   {
//     AttendanceTabScene,
//     ChooseActivityTypeScene,
//     EditDiscussionDetailsScene,
//     ChooseStudentScene,
//     AttendanceCalendarScene
//   },
//   {
//     initialRouteName: 'AttendanceTabScene',
//     navigationOptions: {
//       title: 'נוכחות'
//     }
//     // ,
//     // headerMode: 'none'
//   }
// );

// const MainTabs = createMaterialTopTabNavigator(
//   {
//     StudentsTabStack: {
//       screen: StudentsTabStack
//     },
//     AttendanceTabStack: {
//       screen: AttendanceTabStack
//     }
//   },
//   {
//     initialRouteName: 'StudentsTabStack',
//     order: ['StudentsTabStack', 'AttendanceTabStack'],
//     animationEnabled: true,
//     navigationOptions: {
//       title: 'טמיר'
//     }
//   }
// );
// [1, 3, 5, 5, 3, 1, 4]
// const MainTabsInStack = createStackNavigator({ MainTabsInStack: MainTabs });

const AppWithDrawer = createDrawerNavigator(
  {
    MainStack: {
      screen: MainStack,
      navigationOptions: {
        title: 'חזרה לבית'
      }
    },
    SettingsScene: {
      screen: SettingsScene
    }
  },
  {
    initialRouteName: 'MainStack',
    order: ['MainStack', 'SettingsScene'],
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
