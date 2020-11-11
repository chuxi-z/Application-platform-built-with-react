import React from 'react'
import {connect} from 'react-redux'
import {Button, InputItem, List, NavBar, TextareaItem, WingBlank} from "antd-mobile";
import {Redirect} from "react-router-dom";

import HeaderSelector from "../../components/avatar/header-selector";
import {updateUser} from "../../redux/actions";


class ApplicantInfo extends React.Component {

    state = {
        header: '',
        post: '',
        info: ''
    }

    changeHandle = (name, val) =>{
        this.setState({
            [name]: val
        })
    }

    selectAvatar = (header) =>{
        this.setState({
            header
        })
    }

    save = () =>{
        // console.log(this.state)
        this.props.updateUser(this.state)
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
                    <NavBar>Applicant &nbsp; Info</NavBar>
                    <HeaderSelector selectHeader={this.selectAvatar} />
                    <List>
                        <InputItem onChange={( val) =>{this.changeHandle('post', val)}}>position: </InputItem>
                        <TextareaItem title="Introduce:" rows={3} onChange={( val) =>{this.changeHandle('info', val)}}/>
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
)(ApplicantInfo)
