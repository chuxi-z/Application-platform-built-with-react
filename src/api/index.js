import ajax from "./ajax";


export const reqRegister = (user) =>{
    return ajax('/register', user, 'POST')
}

export const reqLogin = ({username, password}) =>{
    return ajax('/login', {username, password}, 'POST')
}

export const reqUpdate = (user) =>{
    return ajax('/update', user, 'POST')
}

export const reqUser = () =>{
    return ajax('/user')
}

export const reqUserList = (type) =>{
    return ajax("/userlist", {type})
}

export const reqChatMsgList = () =>{
    return ajax("/msglist")
}

export const reqReadMsg = (from) =>{
    return ajax("/readmsg", {from}, 'POST')
}

