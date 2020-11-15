import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from 'react-redux'
import Cookie from 'js-cookie'
import {NavBar} from "antd-mobile";

import Applicant from '../applicant-info/applicant-info.jsx'
import Boss from '../boss-info/boss-info.jsx'
import {getRedirectTo} from "../../utils";
import {getUser} from "../../redux/actions";
import message from "../message/message";
import personal from "../personal/personal";
import boss from "../boss/boss";
import applicant from "../applicant/applicant";
import NotFound from "../../components/notFound/notFound";
import NavFooter from "../../components/nav-footer/nav-footer";
import Chat from "../chat/chat";

class Main extends React.Component {

    navList = [
        {
            path: '/boss', // 路由路径
            component: boss,
            title: 'Applicant List',
            icon: 'dashen',
            text: 'Applicant',
        },
        {
            path: '/applicant', // 路由路径
            component: applicant,
            title: 'Boss List',
            icon: 'laoban',
            text: 'Boss',
        },
        {
            path: '/message', // 路由路径
            component: message,
            title: 'Message List',
            icon: 'message',
            text: 'Message',
        },
        {
            path: '/personal', // 路由路径
            component: personal,
            title: 'Personal List',
            icon: 'personal',
            text: 'Personal',
        }
    ]

    componentDidMount() {
        const userid = Cookie.get('userid')
        const {user} = this.props
        if (userid && !user._id){
            // console.log('send request to get user...')
            this.props.getUser()
        }
    }

    render() {
        // const {user} = this.props
        // if(!user._id){
        //     return <Redirect to='/login' />
        // }

        const userid = Cookie.get('userid')
        if(!userid){
            return <Redirect to='/login' />
        }

        const {user} = this.props
        if(!user._id){
            return null
        }
        else{
            let path = this.props.location.pathname
            if (path === '/'){
                path = getRedirectTo(user.type, user.header)
                return <Redirect to={path}/>
            }
        }

        const pathname = this.props.location.pathname
        const currentNav = this.navList.find(nav => nav.path === pathname)

        let newNavList = []
        if(currentNav){
            if(user.type === 'boss'){
                // this.navList[1].hide = true
                newNavList = this.navList.filter((nav) => nav.text !== 'Boss')
            }
            else{
                // this.navList[0].hide = true
                newNavList = this.navList.filter((nav) => nav.text !== 'Applicant')
            }
        }

        return (
            <div>
                {currentNav ? <NavBar className='stick-top'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {this.navList.map((nav, index) => {
                        return <Route key={index} path={nav.path} component={nav.component} />
                    })}
                    <Route path='/bossinfo' component={Boss}/>
                    <Route path='/applicantinfo' component={Applicant}/>
                    <Route path='/chat/:userid' component={Chat}/>
                    <Route component={NotFound}/>

                </Switch>
                {currentNav ? <NavFooter navList={newNavList}/> : null}
            </div>
        )
    }
}

export default connect(
    state =>({user: state.user}),
    {getUser}
)(Main)
