import {combineReducers} from "redux";

import {AUTH_SUCCESS, ERROR_MSG} from "./action-types";

const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTO: ''
}

function user(state=initUser, action){
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...action.data, redirectTO: "/"}
        case ERROR_MSG:
            return {...state, msg: action.data}
        default:
            return state
    }
}



export default combineReducers({
    user
})
