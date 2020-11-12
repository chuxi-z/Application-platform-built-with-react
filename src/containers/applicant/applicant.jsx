import React from 'react'
import {connect} from "react-redux";

import {getUserList} from '../../redux/actions'
import Userlist from "../../components/user-list/user-list";


class Applicant extends React.Component {

    componentDidMount() {
        this.props.getUserList('boss')
    }


    render() {

        return (
            <div>
                <Userlist Users={this.props.userlist}> </Userlist>

            </div>
        )
    }
}

export default connect(
    state =>({userlist: state.userlist}),
    {getUserList}
)(Applicant)
