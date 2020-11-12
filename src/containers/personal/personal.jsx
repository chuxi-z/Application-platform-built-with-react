import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Modal, Button} from 'antd-mobile'
import Cookies from 'js-cookie'

import {reset} from "../../redux/actions";


const Item = List.Item
const Brief = Item.Brief



class Personal extends React.Component {
    logOut = () =>{
        Modal.alert('logout', 'Confirm to logout?', [
            {text: 'Cancel'},
            {text: 'Confirm',
             onPress: () =>{
                Cookies.remove('userid')
                this.props.reset()
             }}
        ])
    }

    render() {
        const {username, header, post, info, salary, company} = this.props.user

        return (
            <div style={{marginTop: 50}}>
                <Result
                    img={<img src={require(`../../assets/imgs/${header}.png`)} style={{width: 50}} alt="header"/>}
                    title={username}
                    message= {company}/>
                <List renderHeader={() => 'Information'}>
                    <Item multipleLine>
                        <Brief>职位: {post}</Brief>
                        <Brief>简介: {info}</Brief>
                        {salary ? <Brief>薪资: {salary}</Brief> : null}
                    </Item>
                </List>

                <WhiteSpace/>
                <List>
                    <Button type='warning' onClick={this.logOut}>Logout</Button>
                </List>
            </div>
        )
    }
}

export default connect(
    state =>({user: state.user}),
    {reset}
)(Personal)
