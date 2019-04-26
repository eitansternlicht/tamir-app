import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Icon, Container, Item, Input, Fab, Button, Text } from 'native-base';
import MDIcon from 'react-native-vector-icons/MaterialIcons';

const groups = [
  {
    name: 'קבוצה א׳',
    students: [
      { sid: 'a', firstName: 'חניך א׳' },
      { sid: 'b', firstName: 'חניך ב׳' },
      { sid: 'c', firstName: 'חניך ג׳' },
      { sid: 'd', firstName: 'חניך ד׳' },
      { sid: 'e', firstName: 'חניך ה׳' }
    ]
  },
  {
    name: 'קבוצה ב׳',
    students: [
      { sid: 'a', firstName: 'חניך ו׳' },
      { sid: 'b', firstName: 'חניך א׳' },
      { sid: 'c', firstName: 'חניך ז׳' },
      { sid: 'd', firstName: 'חניך ח׳' },
      { sid: 'e', firstName: 'חניך ט׳' }
    ]
  },
  {
    name: 'לא בקבוצה',
    students: [{ sid: 'a', firstName: 'חניך י׳' }, { sid: 'b', firstName: 'חניך יא׳' }]
  }
];
const flatGroups = groups
  .map(({ name, students }) =>
    [{ groupName: name }].concat(students.map(student => ({ ...student, groupName: name })))
  )
  .reduce((acc, curr) => acc.concat(curr), []);

const INITIAL_STATE = {
  fabMenuOpen: false,
  searchText: '',
  filteredStudents: flatGroups
};

class StudentsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(searchText) {
    this.setState({
      searchText,
      filteredStudents: flatGroups.filter(
        ({ sid, firstName }) => !sid || searchText === '' || firstName.includes(searchText)
      )
    });
  }

  renderFabIcon() {
    return this.state.fabMenuOpen ? <Icon name="close" /> : <MDIcon name="edit" />;
  }

  render() {
    return (
      <Container>
        <Item>
          <Input
            placeholder="חיפוש"
            style={styles.searchBox}
            value={this.state.searchText}
            onChangeText={this.onSearch}
          />
          <Icon active name="search" />
        </Item>
        <FlatList
          extraData={this.state.filteredStudents}
          data={this.state.filteredStudents}
          ListFooterComponent={<View style={styles.spaceAtTheEnd} />}
          keyExtractor={({ sid, groupName }) => (sid ? sid + groupName : groupName)}
          renderItem={({ item: { sid, firstName, groupName } }) => (
            <View style={styles.listItem}>
              {sid ? (
                <Text style={styles.studentName}>{firstName}</Text>
              ) : (
                <Text style={styles.groupName}>{groupName}</Text>
              )}
            </View>
          )}
        />

        <Fab
          active={this.state.fabMenuOpen}
          direction="up"
          containerStyle={{}}
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
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    textAlign: 'right'
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC'
  },
  groupName: {
    textAlign: 'right',
    fontSize: 25,
    color: '#666666',
    paddingVertical: 10,
    paddingRight: 10,
    backgroundColor: '#f6f6f6'
  },
  studentName: {
    fontSize: 22,
    paddingVertical: 10,
    paddingRight: 20,
    textAlign: 'right'
  },
  spaceAtTheEnd: {
    height: 100
  }
});

export { StudentsTab };
