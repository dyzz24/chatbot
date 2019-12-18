import { ADD_COMMAND, ADD_BOT_ANSWER } from "../constants/action-types";

const initialState = {
    commands: [],
    answers: []
  };
  function rootReducer(state = initialState, action) {
    if (action.type === ADD_COMMAND) {
        console.log(state, action);

        return {...state, commands: state.commands.concat(action)}
    }
    if (action.type === ADD_BOT_ANSWER) {
      console.log(state, action);

      return {...state, answers: state.answers.concat(action)}
  }
    return state;
  };
  export default rootReducer;