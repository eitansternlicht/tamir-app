import React from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import {
  Icon,
  Header,
  Title,
  Left,
  Right,
  Body,
  Container,
  Item,
  Input,
  Button,
  Text
} from 'native-base';
import { right } from '../utils/style-utils';

const students = [
  { sid: 'a', firstName: 'חניך א׳' },
  { sid: 'b', firstName: 'חניך ב׳' },
  { sid: 'c', firstName: 'student C' },
  { sid: 'd', firstName: 'student D' },
  { sid: 'e', firstName: 'student E' }
];

const INITIAL_STATE = {
  searchText: '',
  filteredStudents: students
};

class PotentialStudentsScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(searchText) {
    this.setState({
      searchText,
      filteredStudents: students.filter(
        ({ sid, firstName }) => !sid || searchText === '' || firstName.includes(searchText)
      )
    });
  }

  render() {
    return (
      <Container style={{ flexDirection: 'column' }}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title> חניכים פוטנציאלים </Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>

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
                <TouchableOpacity>
                  <Text style={styles.studentName}>{firstName}</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.groupName}>{groupName}</Text>
              )}
            </View>
          )}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    textAlign: right
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC'
  },
  groupName: {
    textAlign: right,
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
    textAlign: right
  },
  spaceAtTheEnd: {
    height: 100
  }
});

export { PotentialStudentsScene };
