import React from 'react';
import { View, Alert } from 'react-native';
import { Fab, Icon } from 'native-base';
import Dialog from 'react-native-dialog';
import { FilterableList } from '../components';
import { right } from '../utils/style-utils';
import {
  firebase,
  createNewGroup,
  deleteGroup,
  editGroupName
} from '../utils/firebase/firebase-db';
import { studentUIDsInGroups, selectedStudentsEntries } from '../utils/firebase/local-db';
import { entriesToObj, removeKeys, difference } from '../utils/general-utils';

const deleteStudentsFromGroups = (db, students) => {
  selectedStudentsEntries(students).forEach(([groupUID, studentUIDsToDelete]) => {
    // TODO make transaction
    firebase
      .firestore()
      .collection('Groups')
      .doc(groupUID)
      .update({
        participants: removeKeys(studentUIDsToDelete, db.Groups[groupUID].participants)
      });
  });
};

class StudentsTabScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.filterableListRef = React.createRef();
    this.state = {
      newGroupDialogOpen: false,
      newGroupName: '',
      error: false,
      errorMsg: 'please entrer a group name',
      editGroupDialogOpen: false,
      editGroupName: '',
      editGroupUID: null
    };
    this.onCancel = this.onCancel.bind(this);
    this.onPressAddToGroup = this.onPressAddToGroup.bind(this);
    this.onPressEditGroupName = this.onPressEditGroupName.bind(this);
    this.onPressDeleteStudents = this.onPressDeleteStudents.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onPressDeleteStudents: this.onPressDeleteStudents
    });
  }

  onCancel() {
    this.setState({
      newGroupDialogOpen: false,
      newGroupName: '',
      errorMsg: '',
      editGroupDialogOpen: false,
      editGroupName: '',
      editGroupUID: null
    });
  }

  onPressEditGroupName(groupUID) {
    this.setState({
      editGroupDialogOpen: true,
      editGroupName: this.props.db.Groups[groupUID].name,
      editGroupUID: groupUID
    });
  }

  onPressAddToGroup(groupUID) {
    const allGroupsButSelected = entriesToObj(
      Object.keys(this.props.db.Groups)
        .filter(gUID => gUID !== groupUID)
        .map(gUID => [gUID, this.props.db.Groups[gUID]])
    );
    const participatingStudents = studentUIDsInGroups(this.props.db.Groups);
    const nonParticipatingStudents = difference(this.props.db.Students, participatingStudents);
    const dbWithoutGroup = {
      ...this.props.db,
      Groups: {
        ...allGroupsButSelected,
        noGroup: { name: 'לא בקבוצה', participants: nonParticipatingStudents }
      }
    };
    this.props.navigation.navigate('SelectMultipleStudentsScene', {
      db: dbWithoutGroup,
      groupName: this.props.db.Groups[groupUID].name,
      groupUID,
      groupData: this.props.db.Groups[groupUID]
    });
  }

  onPressDeleteStudents() {
    deleteStudentsFromGroups(this.props.db, this.filterableListRef.current.state.normalizedData);
    this.props.navigation.setParams({ longPressedState: false });
  }

  render() {
    const { navigation, db } = this.props;
    const longPressedState = navigation.getParam('longPressedState');
    const firstSelected = navigation.getParam('firstSelected');
    const reactNativeModalProps = {
      onBackdropPress: this.onCancel
    };
    return (
      <View style={{ flex: 1 }}>
        <FilterableList
          ref={this.filterableListRef}
          multiselect={!!longPressedState}
          noCategoryNotSelectable
          editableCategories
          withCategories
          data={db}
          onPress={student => navigation.navigate('StudentDetailsScene', { student })}
          onLongPress={index => {
            navigation.navigate('MainScene', {
              longPressedState: true,
              firstSelected: index
            });
          }}
          firstSelected={firstSelected}
          onAddToCategory={this.onPressAddToGroup}
          onEditCategoryName={this.onPressEditGroupName}
          deleteCategory={deleteGroup}
          onCancel={this.onCancel}
        />
        <Fab position="bottomLeft" onPress={() => this.setState({ newGroupDialogOpen: true })}>
          <Icon type="AntDesign" name="plus" />
        </Fab>
        <Dialog.Container visible={this.state.newGroupDialogOpen} {...reactNativeModalProps}>
          <Dialog.Title>הוספת קבוצה חדשה</Dialog.Title>
          <Dialog.Input
            style={{
              textAlign: right
            }}
            placeholder="שם הקבוצה"
            value={this.state.newGroupName}
            onChangeText={newGroupName => this.setState({ newGroupName })}
          />
          <Dialog.Description style={{ color: 'red' }}>
            {this.state.error ? this.state.errorMsg : ''}
          </Dialog.Description>
          <Dialog.Button label="ביטול" onPress={this.onCancel} />
          <Dialog.Button
            label="אישור"
            onPress={() =>
              this.state.newGroupName !== ''
                ? this.onCreateNewGroup()
                : this.setState({ error: true })
            }
          />
        </Dialog.Container>
        <Dialog.Container visible={this.state.editGroupDialogOpen} {...reactNativeModalProps}>
          <Dialog.Title>עריכת שם הקבוצה</Dialog.Title>
          <Dialog.Input
            style={{ textAlign: right }}
            placeholder="שם הקבוצה"
            value={this.state.editGroupName}
            onChangeText={text => this.setState({ editGroupName: text })}
          />
          <Dialog.Button label="ביטול" onPress={this.onCancel} />
          <Dialog.Button
            label="אישור"
            onPress={() => {
              editGroupName(this.state.editGroupUID, this.state.editGroupName);
              this.onCancel();
            }}
          />
        </Dialog.Container>
      </View>
    );
  }
}

export { StudentsTabScene };
