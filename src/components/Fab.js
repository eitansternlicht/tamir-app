import React from 'react';
import { Fab as NBFab, Button, Icon } from 'native-base';
import MDIcon from 'react-native-vector-icons/MaterialIcons';

const INITIAL_STATE = {
  fabMenuOpen: false
};

class Fab extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    const { position, backgroundColor, buttons, mdIcon } = this.props;
    return (
      <NBFab
        active={this.state.fabMenuOpen}
        direction="up"
        style={{ backgroundColor }}
        position={position}
        // eslint-disable-next-line react/no-access-state-in-setstate
        onPress={() =>
          this.setState(state => ({
            fabMenuOpen: !state.fabMenuOpen
          }))
        }>
        {this.state.fabMenuOpen ? <Icon name="close" /> : <MDIcon name={mdIcon} />}
        {buttons.map(({ backgroundColor: bgColor, name, onPress }, i) => (
          <Button key={i.toString()} style={{ backgroundColor: bgColor }} onPress={onPress}>
            <Icon name={name} />
          </Button>
        ))}
      </NBFab>
    );
  }
}

export { Fab };
