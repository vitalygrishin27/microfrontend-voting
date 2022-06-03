import thunk from "redux-thunk";
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "../reducers/rootReducer";

const configureStore = () => {
    const middlewares = [thunk]
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancers = composeEnhancers(applyMiddleware(...middlewares));
    const store = createStore(rootReducer(),enhancers)

    return store;
};

export default configureStore;