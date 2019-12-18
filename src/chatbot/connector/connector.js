import React from 'react';
import { addCommand } from '../../redux/actions';
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    addCommand: command => dispatch(addCommand(command))
  };
}
class Connect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  emitEvent = (e) => {
    this.props.addCommand(e)
  }
  componentDidMount() {
    this.props.emit(e => this.emitEvent(e))
  }

  render() {
    return null;
  }
}


const EmitEvent = connect(
  null,
  mapDispatchToProps
)(Connect);
export default EmitEvent;
