import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Container, Item, Input, List, ListItem, Fab, Button, Text } from 'native-base';
import MDIcon from 'react-native-vector-icons/MaterialIcons';

class StudentsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  renderFabIcon() {
    return this.state.active ? <Icon name="close" /> : <MDIcon name="edit" />;
  }

  render() {
    return (
      <Container>
        <Item>
          <Input placeholder="חיפוש" style={styles.searchBox} />
          <Icon active name="search" />
        </Item>
        <List>
          <ListItem itemDivider>
            <Text>קבוצה א׳</Text>
          </ListItem>
          <ListItem>
            <Text>חניך א׳</Text>
          </ListItem>
          <ListItem>
            <Text>חניך ב׳</Text>
          </ListItem>
          <ListItem itemDivider>
            <Text>קבוצה ב׳</Text>
          </ListItem>
          <ListItem>
            <Text>חניך ג׳</Text>
          </ListItem>
          <ListItem itemDivider>
            <Text>לא בקבוצה</Text>
          </ListItem>
          <ListItem>
            <Text>חניך ד׳</Text>
          </ListItem>
        </List>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          // eslint-disable-next-line react/no-access-state-in-setstate
          onPress={() => this.setState({ active: !this.state.active })}>
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
  }
});

export { StudentsTab };
