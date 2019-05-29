import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { right } from '../utils/style-utils';

const groups = [
  { title: 'פעילות קבוצתית' },
  { sid: 'a', title: 'פעילות קבוצתית', data: '8סרט' },
  { sid: 'b', title: 'פעילות קבוצתית', data: '2סרט' },
  { sid: 'c', title: 'פעילות קבוצתית', data: '3סרט' },
  { sid: 'd', title: 'פעילות קבוצתית', data: '4סרט' },
  { sid: 'e', title: 'פעילות קבוצתית', data: '5סרט' },
  { title: 'שיחה אישית' },
  { sid: 'a', title: 'שיחה אישית', data: 'מזדמנת' },
  { sid: 'b', title: 'שיחה אישית', data: 'הכרות' },
  { sid: 'c', title: 'שיחה אישית', data: 'עמוקה' },
  { sid: 'd', title: 'שיחה אישית', data: 'קושי/בעיה' },
  { sid: 'e', title: 'שיחה אישית', data: 'חניך ט׳' },
  { title: 'שונות' },
  { sid: 'a', title: 'שונות', data: 'שונות' }
];
function tIcon(title) {
  if (title === 'פעילות קבוצתית') return <Icon name="people" />;
  if (title === 'שיחה אישית') return <Icon name="person" />;
  return undefined;
}
const INITIAL_STATE = {
  filteredStudents: groups
};
class ChooseActivityTypeScene extends React.Component {
  static navigationOptions = {
    title: 'פעילות שבוצעה'
  };

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    return (
      <FlatList
        extraData={this.state.filteredStudents}
        data={this.state.filteredStudents}
        ListFooterComponent={<View style={styles.spaceAtTheEnd} />}
        keyExtractor={({ title, data }) => data + title}
        renderItem={({ item: { sid, title, data } }) => (
          <View style={styles.listItem}>
            {sid ? (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('EditDiscussionDetailsScene', {
                    title,
                    data,
                    db: this.props.navigation.state.params.db
                  })
                }>
                <Text style={styles.studentName}>
                  <EntypoIcon key={title + sid} name="chevron-right" /> {data}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.groupName}>
                {title}
                {tIcon(title)}
              </Text>
            )}
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    textAlign: right
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    textAlign: right
  },
  groupName: {
    fontSize: 25,
    color: '#666666',
    paddingVertical: 10,
    paddingRight: 10,
    backgroundColor: '#f6f6f6',
    textAlign: right
  },
  studentName: {
    fontSize: 18,
    paddingVertical: 10,
    paddingRight: 20,
    textAlign: right,
    marginLeft: 'auto'
  },
  spaceAtTheEnd: {
    height: 100
  }
});
export { ChooseActivityTypeScene };
