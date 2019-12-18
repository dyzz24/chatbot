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

  editStore = (e) => {
    this.props.addCommand(e)
  }
  componentDidMount() {
    this.props.emit(e => this.editStore(e))
  }

  render() {
    return null;
  }
}


const Emitter = connect(
  null,
  mapDispatchToProps
)(Connect);
export default Emitter;
