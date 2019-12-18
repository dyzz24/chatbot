import { ADD_COMMAND } from "../constants/action-types";

const initialState = {
    articles: []
  };
  function rootReducer(state = initialState, action) {
    if (action.type === ADD_COMMAND) {
        console.log(state, action);
        return Object.assign({}, state, {
          articles: state.articles.concat(action)
        });
    }
    return state;
  };
  export default rootReducer;