import {combineReducers} from "redux";

import {AUTH_SUCCESS, ERROR_MSG, RESET_USER, RECEIVE_USER, RECEIVE_USER_LIST, RECEIVE_MSG, RECEIVE_MSG_LIST} from "./action-types";
import {getRedirectTo} from "../utils";

const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTO: ''
}

function user(state=initUser, action){
    switch (action.type) {
        case AUTH_SUCCESS:
            const {type, header} = action.data
            return {...action.data, redirectTO: getRedirectTo(type, header)}
        case ERROR_MSG:
            return {...state, msg: action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {...initUser, msg: action.data}
        default:
            return state
    }
}

const initUserList = []

function userlist(state=initUserList, action){
    switch (action.type){
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}

const initChatMsgList={
    users: {},
    chatMess: [],
    unReadCount: 0
}

function chat(state=initChatMsgList, action) {
    switch (action.type){
        case RECEIVE_MSG_LIST:
            const {users, chatMess} = action.data
            return {users, chatMess, unReadCount: 0}
        case RECEIVE_MSG:
            const chatMsg = action.data
            return {
                users: state.users,
                chatMess: [...state.chatMess, chatMsg],
                unReadCount: 0
            }
        default:
            return state
    }
}



export default combineReducers({
    user,
    chat,
    userlist,

})
