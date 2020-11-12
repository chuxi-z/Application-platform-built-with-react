import React from 'react'
import {Button} from "antd-mobile";

class NotFound extends React.Component {

    render() {

        return (
            <div>
                <h2>Sorry, web can not be found...</h2>
                <Button type='primary' onClick={this.props.history.replace('/')} />
            </div>
        )
    }
}

export default NotFound
