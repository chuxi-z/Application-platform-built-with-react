
import {reqRegister, reqLogin, reqUpdate, reqUser, reqUserList, reqChatMsgList, reqReadMsg} from "../api/index";
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RECEIVE_USER_LIST, RESET_USER, RECEIVE_MSG_LIST, RECEIVE_MSG} from "./action-types";
import io from 'socket.io-client'

const initIo = (dispatch, userid) =>{
    if(!io.socket){
        io.socket = io('ws://localhost:4000')
        // 绑定'receiveMessage'的监听, 来接收服务器发送的消息
        io.socket.on('receiveMsg', function (chatMsg) {
            console.log('----------------- client starts to listen from serve', chatMsg)
            if(chatMsg.from === userid || chatMsg.to === userid){
                dispatch(receiveMsg(chatMsg))
            }
        })
    }
}


const authSuccess = (user) =>({type: AUTH_SUCCESS, data: user})
const errorMsg = (msg) =>({type: ERROR_MSG, data: msg})


const receive = (user) =>({type: RECEIVE_USER, data: user})
export const reset = (msg) =>({type: RESET_USER, data: msg})

const receiveList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})

const receiveMsgList = ({users, chatMess}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMess}})
const receiveMsg = (chatMsg) => ({type: RECEIVE_MSG, data: chatMsg})

async function getMsgList(dispatch, userid){
    initIo(dispatch, userid)
    const response = await reqChatMsgList()
    const res = response.data

    if(res.code === 0){
        const {users, chatMess} = res.data
        dispatch(receiveMsgList({users, chatMess}))
    }
}



export const register = (user) =>{
    const {username, password, password2} = user
    if(password !== password2){
        return errorMsg("Password should be the same...")
    }
    else if(!username){
        return errorMsg("username cannot be empty...")
    }

    return async dispatch=>{
        const response = await reqRegister(user)
        const res = response.data  // {code: 1/0, data: user, msg: ''}

        if (res.code === 0){
            getMsgList(dispatch, res.data._id)
            dispatch(authSuccess(res.data))
        }
        else{
            dispatch(errorMsg(res.msg))
        }
    }
}


export const login = (user) =>{
    const {username, password} = user
    if(!password){
        return errorMsg("Password cannot be empty...")
    }
    else if(!username){
        return errorMsg("username cannot be empty...")
    }

    return async dispatch=>{
        const response = await reqLogin(user)
        const res = response.data

        if (res.code === 0){
            getMsgList(dispatch, res.data._id)
            dispatch(authSuccess(res.data))
        }
        else{
            dispatch(errorMsg(res.msg))
        }
    }
}


export const updateUser = (user) =>{
    return async dispatch =>{
        const response = await reqUpdate(user)
        // console.log(user)
        const res = response.data

        if(res.code === 0){
            dispatch(receive(res.data))
        }
        else{
            dispatch(reset(res.msg))
        }
    }
}


export const getUser = () =>{
    return async dispatch =>{
        const response = await reqUser()
        const res = response.data

        if (res.code === 0){
            getMsgList(dispatch, res.data._id)
            dispatch(receive(res.data))
        }
        else{
            dispatch(reset(res.msg))
        }
    }
}


export const getUserList = (type) =>{
    return async dispatch =>{
        const response = await reqUserList(type)
        const res = response.data

        if (res.code === 0){
            dispatch(receiveList(res.data))
        }
    }

}


export const sendMsg = ({from, to, content}) =>{
    return dispatch =>{
        console.log('-------------------client send msg to server...',{from, to, content})
        // initIo()
        io.socket.emit('sendMsg', {from, to, content})
    }
}

