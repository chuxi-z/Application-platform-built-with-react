import React from 'react'
import {connect} from 'react-redux'

import Userlist from "../../components/user-list/user-list";
import {getUserList} from "../../redux/actions";

class Boss extends React.Component {

    componentDidMount() {
        this.props.getUserList('applicant')
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
)(Boss)
