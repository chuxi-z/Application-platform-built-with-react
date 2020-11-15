import React from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem, Icon} from 'antd-mobile'

import {sendMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends React.Component {

    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight)
    }

    state = {
        content: ''
    }

    handleSend = () =>{
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content

        if(content){
            this.props.sendMsg({ from, to, content})
        }
        this.setState({content: ''})
    }


    render() {

        const {user} = this.props
        const {users, chatMess} = this.props.chat

        const meId = user._id
        if(!users[meId]){
            return null
        }
        const targetId = this.props.match.params.userid
        const chatId = [meId, targetId].sort().join('_')

        const msgs = chatMess.filter(msg => msg.chat_id === chatId)

        const targetHeader = users[targetId].header

        const targetIcon = targetHeader? require(`../../assets/imgs/${targetHeader}.png`) : null

        return (<div id='chat-page'>
            <NavBar icon={<Icon type='left'/>} className='stick-top' onLeftClick={() =>{this.props.history.goBack()}}>{users[targetId].username}</NavBar>
            <List style={{marginTop: 50, margainBottom: 50}}>
                {
                    msgs.map(msg =>{
                        if(msg.from === targetId){
                            return <Item key={msg._id} thumb={targetIcon}>{msg.content}</Item>
                        }
                        else{
                            return <Item key={msg._id} className='chat-me' extra='Me'>{msg.content}</Item>
                        }

                    })
                }
            </List>
            <div className='am-tab-bar'><InputItem
                value={this.state.content}
                placeholder="请输入" onChange={(val) =>{this.setState({content: val})}} extra={
                <span onClick={this.handleSend}>发送</span>}/>
            </div>
        </div>)

    }
}

export default connect(
    state =>({user: state.user, chat: state.chat}),
    {sendMsg}
)(Chat)
