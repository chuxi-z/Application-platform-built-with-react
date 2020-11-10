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
