import React from 'react';
import { View } from 'react-native';
import { Icon, Fab, Button } from 'native-base';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import { FilterableList } from '../../components';

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

const INITIAL_STATE = {
  fabMenuOpen: false
};

class StudentsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  renderFabIcon() {
    return this.state.fabMenuOpen ? <Icon name="close" /> : <MDIcon name="edit" />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FilterableList
          withCategories
          data={groups}
          onPress={item => console.log('item pressed', item)}
        />
        <Fab
          active={this.state.fabMenuOpen}
          direction="up"
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          // eslint-disable-next-line react/no-access-state-in-setstate
          onPress={() => this.setState({ fabMenuOpen: !this.state.fabMenuOpen })}>
          {this.renderFabIcon()}
          <Button style={{ backgroundColor: '#3B5998' }}>
            <Icon name="people" />
          </Button>
          <Button style={{ backgroundColor: '#34A34F' }}>
            <Icon name="person" />
          </Button>
        </Fab>
      </View>
    );
  }
}

export { StudentsTab };
