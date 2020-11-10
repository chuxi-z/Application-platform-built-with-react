import React from 'react'
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button} from "antd-mobile";
import Logo from '../../components/logo/logo.jsx'

const ListItem = List.Item
export default class Register extends React.Component {

    state = {
        username: '',
        password: '',
        password2: '',
        type: 'applicant'
    }

    handleChange = (property, value) =>{
        this.setState({
            [property]: value
        })
    }

    register = () =>{
        console.log(this.state)
    }

    toLogin = () =>{
        this.props.history.replace('/login')
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
                        <InputItem type={"password"} onChange={value => {this.handleChange('password2', value)}}>Confirm: </InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>User Type:</span>
                            &nbsp; &nbsp;&nbsp; &nbsp;
                            <Radio checked={this.state.type === 'boss'} onChange={()=>this.handleChange('type', 'boss')}>Boss</Radio>
                            &nbsp; &nbsp;&nbsp; &nbsp;
                            <Radio checked={this.state.type === 'applicant'} onChange={()=>this.handleChange('type', 'applicant')}>Applicant</Radio>
                        </ListItem>
                        {/*<Button type={"primary"} onClick={() => {this.register()}}>Register</Button>*/}
                        <Button type={"primary"} onClick={this.register}>Register</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>Have an Account</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
