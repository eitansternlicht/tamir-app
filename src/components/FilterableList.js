import React from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import { Icon, Item, Input, Text, Button, Footer } from 'native-base';
import update from 'immutability-helper';
import { normalizeData, filterBy, getUniqueKey, getStudentName } from '../utils/student-utils';
import { right } from '../utils/style-utils';

class FilterableList extends React.Component {
  constructor(props) {
    super(props);
    const { withCategories, data, multiselect } = props;
    const normalizedData = normalizeData(withCategories, multiselect, data);
    this.state = {
      searchText: '',
      normalizedData,
      filteredData: normalizedData
    };
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(searchText) {
    const { normalizedData } = this.state;
    this.setState({
      searchText,
      filteredData: filterBy(searchText, ['שם פרטי', 'שם משפחה'], normalizedData)
    });
  }

  render() {
    const { multiselect, withCategories, onPress } = this.props;
    return (
      <View style={{ flex: 1 }}>
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
          extraData={this.state.filteredData}
          data={this.state.filteredData}
          ListFooterComponent={<View style={styles.spaceAtTheEnd} />}
          keyExtractor={getUniqueKey(withCategories)}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              {!withCategories || !item.categoryName ? (
                <TouchableOpacity
                  onPress={() => {
                    if (!multiselect) onPress(item);
                    else {
                      const { normalizedData, searchText } = this.state;
                      const newNormalizedData = update(normalizedData, {
                        [normalizedData.indexOf(item)]: { selected: { $set: !item.selected } }
                      });
                      this.setState({
                        normalizedData: newNormalizedData,
                        filteredData: filterBy(
                          searchText,
                          ['שם פרטי', 'שם משפחה'],
                          newNormalizedData
                        )
                      });
                    }
                  }}
                  style={{
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingVertical: 5
                  }}>
                  <Text style={styles.studentName}>{getStudentName(item)}</Text>
                  <Icon
                    name="checkmark"
                    style={[{ fontSize: 40 }, !item.selected && { display: 'none' }]}
                  />
                </TouchableOpacity>
              ) : (
                <Text style={styles.groupName}>{item.categoryName}</Text>
              )}
            </View>
          )}
        />
        {multiselect ? (
          <Footer>
            <Button
              onPress={() =>
                this.props.onAction(this.state.normalizedData.filter(({ selected }) => selected))
              }>
              <Text>{this.props.actionTitle}</Text>
            </Button>
          </Footer>
        ) : (
          <View />
        )}
      </View>
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
    padding: 10,
    paddingRight: 10,
    backgroundColor: '#f6f6f6'
  },
  studentName: {
    fontSize: 22,
    alignSelf: 'center',
    textAlign: right
  },
  spaceAtTheEnd: {
    height: 100
  }
});
export { FilterableList };
