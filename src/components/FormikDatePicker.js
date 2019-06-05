import React from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Input } from 'native-base';
import { types } from '../utils/student/constants';

class FormikDatePicker extends React.PureComponent {
  state = {
    pickerOpened: false
  };

  focus = () => this.openPicker();

  openPicker = () => {
    this.setState({ pickerOpened: true });
  };

  closePicker = () =>
    this.setState({ pickerOpened: false }, () => {
      this.props.setFieldTouched();
    });

  handleDatePicked = value => {
    this.props.setFieldValue(value);
    this.closePicker();
    if (this.props.onSubmitEditing) this.props.onSubmitEditing();
  };

  render() {
    return (
      <React.Fragment>
        {/* <DisableKeyboard onPress={this.openPicker}> */}
        {/* <MaterialTextInput */}
        <Input {...this.props} value={types.DATE.format(this.props.value)} />
        {/* /> */}
        {/* </DisableKeyboard> */}
        <DateTimePicker
          isVisible={this.state.pickerOpened}
          onConfirm={this.handleDatePicked}
          onCancel={this.closePicker}
          {...this.props}
        />
      </React.Fragment>
    );
  }
}

export { FormikDatePicker };
