import React from 'react';
import { View } from 'react-native';
import { Fab, Icon } from 'native-base';
import Dialog from 'react-native-dialog';
import { FilterableList } from '../components';
import { right } from '../utils/style-utils';
import { firebase } from '../utils/firebase/firebase-db';
import { entriesToObj } from '../utils/general-utils';

class StudentsTabScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newGroupDialogOpen: false,
      newGroupName: ''
    };
    this.onCancel = this.onCancel.bind(this);
    this.onCreateNewGroup = this.onCreateNewGroup.bind(this);
    this.onPressAddToGroup = this.onPressAddToGroup.bind(this);
  }

  onCancel() {
    this.setState({
      newGroupDialogOpen: false,
      newGroupName: ''
    });
  }

  onCreateNewGroup() {
    firebase
      .firestore()
      .collection('Groups')
      .add({
        owners: { tutors: [firebase.auth().currentUser.uid] },
        name: this.state.newGroupName,
        participants: {}
      })
      .then(docRef => console.log('New Group with ID: ', docRef.id));

    this.setState({
      newGroupDialogOpen: false,
      newGroupName: ''
    });
  }

  onPressAddToGroup(groupUID) {
    const allGroupsButSelected = entriesToObj(
      Object.keys(this.props.db.Groups)
        .filter(gUID => gUID !== groupUID)
        .map(gUID => [gUID, this.props.db.Groups[gUID]])
    );
    const dbWithoutGroup = { ...this.props.db, Groups: allGroupsButSelected };
    this.props.navigation.navigate('SelectMultipleStudentsScene', {
      db: dbWithoutGroup,
      groupName: this.props.db.Groups[groupUID].name,
      groupUID,
      groupData: this.props.db.Groups[groupUID]
    });
  }

  render() {
    const { navigation, db } = this.props;
    const reactNativeModalProps = {
      onBackdropPress: this.onCancel
    };
    return (
      <View style={{ flex: 1 }}>
        <FilterableList
          editableCategories
          withCategories
          data={db}
          onPress={student => navigation.navigate('StudentDetailsScene', { student })}
          onAddToCategory={this.onPressAddToGroup}
        />
        <Fab position="bottomLeft" onPress={() => this.setState({ newGroupDialogOpen: true })}>
          <Icon type="AntDesign" name="plus" />
        </Fab>
        <Dialog.Container visible={this.state.newGroupDialogOpen} {...reactNativeModalProps}>
          <Dialog.Title>הוספת קבוצה חדשה</Dialog.Title>
          <Dialog.Input
            style={{ textAlign: right }}
            placeholder="שם הקבוצה"
            value={this.state.newGroupName}
            onChangeText={newGroupName => this.setState({ newGroupName })}
          />
          <Dialog.Button label="ביטול" onPress={this.onCancel} />
          <Dialog.Button label="אישור" onPress={this.onCreateNewGroup} />
        </Dialog.Container>
      </View>
    );
  }
}

export { StudentsTabScene };
