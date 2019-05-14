import React from 'react';
import { Icon, Fab, Button, Container } from 'native-base';
import { FilterableList } from '../components';

const selectedGroup = 'קבוצה ב׳';
const students = {
  studentA_UID: { 'שם פרטי': 'חניך א׳' },
  studentB_UID: { 'שם פרטי': 'חניך ב׳' },
  studentC_UID: { 'שם פרטי': 'חניך ג׳' },
  studentD_UID: { 'שם פרטי': 'חניך ד׳' },
  studentE_UID: { 'שם פרטי': 'חניך ה׳' }
};
const INITIAL_STATE = {
  fabMenuOpen: false
};

class ManageGroupParticipantsScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  renderFabIcon() {
    return this.state.fabMenuOpen ? (
      <Icon name="close" type="Ionicons" />
    ) : (
      <Icon name="edit" type="MaterialIcons" />
    );
  }

  render() {
    return (
      <Container>
        {/* <Header title={selectedGroup} back /> */}
        <FilterableList data={students} onPress={item => console.log('item pressed', item)} />
        <Fab
          active={this.state.fabMenuOpen}
          direction="up"
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          // eslint-disable-next-line react/no-access-state-in-setstate
          onPress={() => this.setState({ fabMenuOpen: !this.state.fabMenuOpen })}>
          {this.renderFabIcon()}
          <Button style={{ backgroundColor: '#3B5998' }}>
            <Icon name="add" />
          </Button>
          <Button style={{ backgroundColor: '#34A34F' }}>
            <Icon name="trash" />
          </Button>
        </Fab>
      </Container>
    );
  }
}

export { ManageGroupParticipantsScene };
