import { ADD_COMMAND } from "../constants/action-types";

const initialState = {
    commands: []
  };
  function rootReducer(state = initialState, action) {
    if (action.type === ADD_COMMAND) {
        console.log(state, action);

        return {...state, commands: state.commands.concat(action)}
    }
    return state;
  };
  export default rootReducer;