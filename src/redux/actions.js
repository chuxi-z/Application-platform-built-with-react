
import {reqRegister, reqLogin, reqUpdate, reqUser, reqUserList} from "../api/index";
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RECEIVE_USER_LIST, RESET_USER} from "./action-types";


const authSuccess = (user) =>({type: AUTH_SUCCESS, data: user})
const errorMsg = (msg) =>({type: ERROR_MSG, data: msg})


const receive = (user) =>({type: RECEIVE_USER, data: user})
export const reset = (msg) =>({type: RESET_USER, data: msg})

const receiveList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})


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
