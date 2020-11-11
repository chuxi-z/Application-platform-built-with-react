import React from 'react'
import {List, Grid} from "antd-mobile";
import PropTypes from 'prop-types'

export default class HeaderSelector extends React.Component {

    static propTypes = {
        selectHeader: PropTypes.func.isRequired
    }

    state = {
        icon: null
    }

    constructor() {
        super();
        this.avatarList = []
        for(var i = 0; i < 20; i++){
            this.avatarList.push({
                text: 'avatar' + (i+1),
                icon: require(`../../assets/imgs/头像${i+1}.png`)
            })
        }

    }

    setHeader = (el) =>{
        this.setState({
            icon: el.icon
        })
        this.props.selectHeader(el.text)
    }

    render() {
        const {icon} = this.state
        const ListHeader = !icon ? 'Please choose an avatar...' :(
            <div>
                The chosen avatar is: <img src={icon}/>
            </div>
        )

        return (
            <List renderHeader={() =>ListHeader}>
                <Grid data={this.avatarList} columnNum={5} onClick={(el) => this.setHeader(el)} />
            </List>
        )
    }
}
