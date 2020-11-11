import React from 'react'
import {connect} from 'react-redux'
import {NavBar, InputItem, List, TextareaItem, Button, WingBlank} from "antd-mobile";
import {Redirect} from "react-router-dom";

import HeaderSelector from "../../components/avatar/header-selector";
import {updateUser} from "../../redux/actions";



class BossInfo extends React.Component {

    state = {
        header: '',
        post: '',
        info: '',
        company: '',
        salary: ''
    }

    changeHandle = (name, val) =>{
        this.setState({
            [name]: val
        })
    }

    save = () =>{
        // console.log(this.state)
        this.props.updateUser(this.state)
    }

    selectAvatar = (avatar)=>{
        this.setState({
            header: avatar
        })
    }

    render() {
        const {header, type} = this.props.user
        if (header){
            const path = type === 'boss'? '/boss':'/applicant'
            return <Redirect to={path}></Redirect>
        }

        return (
            <div>
                <WingBlank>
                    <NavBar>Boss &nbsp; Info</NavBar>
                    <HeaderSelector selectHeader={this.selectAvatar}></HeaderSelector>
                    <List>
                        <InputItem onChange={( val) =>{this.changeHandle('post', val)}}>Recruitment: </InputItem>
                        <InputItem onChange={( val) =>{this.changeHandle('company', val)}}>Company: </InputItem>
                        <InputItem onChange={( val) =>{this.changeHandle('salary', val)}}>Salary: </InputItem>
                        <TextareaItem title="Require:" rows={3} onChange={( val) =>{this.changeHandle('info', val)}}></TextareaItem>
                        <Button type='primary' onClick={this.save}>Save</Button>
                    </List>
                </WingBlank>

            </div>
        )
    }
}

export default connect(
    state =>({user: state.user}),
    {updateUser}
)(BossInfo)
