import { createStore } from "redux";
import rootReducer from "../reducers/index";
const mainStore = createStore(rootReducer);
export default mainStore;