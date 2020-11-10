import React from 'react'
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Button} from "antd-mobile";
import Logo from '../../components/logo/logo.jsx'

const ListItem = List.Item
export default class Register extends React.Component {

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
        console.log(this.state)
    }

    toRegister = () =>{
        this.props.history.replace('/register')
    }

    render() {
        return (
            <div>
                <NavBar>Job&nbsp; &nbsp;Hunting</NavBar>
                <Logo></Logo>
                <WingBlank>
                    <List>
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
