import React from 'react';
import { Container, Tabs, Tab, Spinner } from 'native-base';
import { appName } from '../../app.json';
import { AttendanceTab, StudentsTab } from './scenesections';
import { initFirebase, getDB } from '../utils/firebase-utils';

class MainScene extends React.PureComponent {
  static navigationOptions = {
    title: appName
  };

  constructor(props) {
    super(props);
    this.state = { loading: true };
    initFirebase();
    getDB().then(db => {
      this.setState({ db, loading: false });
    });
  }

  render() {
    return (
      <Container>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <Tabs>
            <Tab heading="חניכים">
              <StudentsTab db={this.state.db} navigation={this.props.navigation} />
            </Tab>
            <Tab heading="נוכחות">
              <AttendanceTab db={this.state.db} navigation={this.props.navigation} />
            </Tab>
          </Tabs>
        )}
      </Container>
    );
  }
}
export { MainScene };
