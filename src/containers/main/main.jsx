import React from 'react'
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {connect} from 'react-redux'

import Applicant from '../applicant-info/applicant-info.jsx'
import Boss from '../boss-info/boss-info.jsx'

class Main extends React.Component {

    render() {
        const {user} = this.props
        if(!user._id){
            return <Redirect to='/login' />
        }

        return (
            <div>
                <Switch>
                    <Route path='/bossinfo' component={Boss}/>
                    <Route path='/applicantinfo' component={Applicant}/>
                </Switch>
            </div>
        )
    }
}

export default connect(
    state =>({user: state.user})
)(Main)
