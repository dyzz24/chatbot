import { addCommand } from '../../redux/actions';


export const mapDispatchToProps =(dispatch) => {
  return {
    addCommand: command => dispatch(addCommand(command))
  };
}