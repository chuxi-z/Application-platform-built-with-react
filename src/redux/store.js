import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension/index";


export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
