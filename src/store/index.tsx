import { compose, createStore } from "redux";
import reactotron from "../config/reactotron";
import rootReducer from "./modules/rootReducer";

const store = createStore(rootReducer, compose(reactotron.createEnhancer!()));

export default store;
