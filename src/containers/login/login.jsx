import React from 'react'
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Button} from "antd-mobile";
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom";

import Logo from '../../components/logo/logo.jsx'
import {login} from "../../redux/actions";

class Login extends React.Component {

    state = {
        username: '',
        password: '',
    }

    handleChange = (property, value) =>{
        this.setState({
            [property]: value
        })
    }

    login = () =>{
        // console.log(this.state)
        this.props.login(this.state)
    }

    toRegister = () =>{
        this.props.history.replace('/register')
    }

    render() {
        const {msg, redirectTO} = this.props.user
        // console.log(redirectTo)
        if(redirectTO){
            // console.log(redirectTO)
            return <Redirect to='/' />
        }
        return (
            <div>
                <NavBar>Job&nbsp; &nbsp;Hunting</NavBar>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <div>{msg ? <div className='error-msg'>{msg}</div>: null}</div>
                        <WhiteSpace/>
                        <InputItem onChange={value => {this.handleChange('username', value)}}>Username: </InputItem>
                        <WhiteSpace/>
                        <InputItem type={"password"} onChange={value => {this.setState({password: value})}}>Password: </InputItem>
                        <WhiteSpace/>
                        <Button type={"primary"} onClick={this.login}>Login</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister}>Register</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state =>({user: state.user}),
    {login}
)(Login)
