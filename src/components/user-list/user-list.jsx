import React from 'react'
import {WingBlank, Card, WhiteSpace} from "antd-mobile";
import PropsType from 'prop-types'
import {withRouter} from "react-router-dom";

const Header = Card.Header
const Body = Card.Body

class UserList extends React.Component {

    static propsType = {
        Users: PropsType.array.isRequired
    }

    render() {
        const {Users} = this.props
        return (
            <WingBlank style={{marginBottom: 50, marginTop: 50}}>
                {
                    this.props.Users.map(user => {
                        return <div key={user._id}>
                            <WhiteSpace/>
                            <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                <Header
                                    thumb={require(`../../assets/imgs/${user.header}.png`)}
                                    extra={user.username}
                                />
                                <Body>
                                    <div>Position: {user.post}</div>
                                    {
                                        user.company ? <div>Company: {user.company}</div> : null
                                    }
                                    {
                                        user.salary ? <div>Salary: {user.salary}</div> : null
                                    }
                                    <div>Info: {user.info}</div>
                                </Body>
                            </Card>
                        </div>
                    })
                }

            </WingBlank>
        )
    }
}

export default withRouter(UserList)
