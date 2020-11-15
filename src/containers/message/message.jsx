import React from 'react'
import {connect} from 'react-redux'
import {Badge, List} from "antd-mobile";
import chat from "../chat/chat";

const Item = List.Item
const Brief = Item.Brief


function getLastMsgs(chatMsgs){
    const lastMsgObjs = {}
    chatMsgs.forEach(msg =>{
        const chatId = msg.chat_id
        let lastMsg = lastMsgObjs[chatId]

        if(!lastMsg){
            lastMsgObjs[chatId] = msg
        }
        else{
            if(msg.create_time > lastMsg.create_time){
                lastMsgObjs[chatId] = msg
            }
        }
    })

    const lastMsgs = Object.values(lastMsgObjs)

    lastMsgs.sort(function (m1, m2) {
        return m2.create_time - m1.create_time
    })

    return lastMsgs
}

class Message extends React.Component {

    render() {
        const {user} = this.props
        const {users, chatMess} = this.props.chat

        const lastMsgs = getLastMsgs(chatMess)

        return (
            <List style={{marginTop: 50, marginBottom: 50}}>
                {
                    lastMsgs.map(msg =>{
                        const targetUserId =  msg.to === user._id ? msg.from : msg.to
                        const targetUser = msg.to === user._id ? users[msg.from] : users[msg.to]
                        return (
                            <Item extra={<Badge text={3}/>}
                                  thumb={targetUser.header ? require(`../../assets/imgs/${targetUser.header}.png`):null}
                                  arrow='horizontal' key={msg.create_time}
                                    onClick={() =>{this.props.history.push(`/chat/${targetUserId}`)}}>
                                {msg.content}
                                <Brief>{users[msg.to === user._id? msg.from:msg.to].username}</Brief>
                            </Item>
                        )
                    })
                }

            </List>
        )
    }
}

export default connect(
    state =>({user: state.user, chat: state.chat}),
    {}
)(Message)
