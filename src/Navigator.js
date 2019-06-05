/* eslint-disable no-unused-vars */
import {
  createStackNavigator,
  createAppContainer,
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
  PhoneInputScene,
  SmsCodeConfirmScene,
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
    EditStudentDetailsScene: {
      screen: EditStudentDetailsScene
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
    ChooseStudentScene: {
      screen: ChooseStudentScene
    },
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
    },
    GroupParticipantsAttendanceScene: {
      screen: GroupParticipantsAttendanceScene
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

const AuthStack = createStackNavigator({
  PhoneInputScene: {
    screen: PhoneInputScene,
    navigationOptions: {
      title: 'התחברות'
    }
  },
  SmsCodeConfirmScene: {
    screen: SmsCodeConfirmScene,
    navigationOptions: {
      title: 'אמת סיסמה'
    }
  }
});

const AppWithAuth = createSwitchNavigator(
  {
    AuthLoadingScene,
    AuthStack,
    AppWithDrawer
  },
  { initialRouteName: 'AuthLoadingScene' }
);

export default createAppContainer(AppWithAuth);
