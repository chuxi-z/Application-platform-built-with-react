import React from 'react'
import {TabBar} from "antd-mobile";
import PropsType from 'prop-types'
import {withRouter} from "react-router-dom";
const Item = TabBar.Item

class NavFooter extends React.Component {

    static propsType = {
        navList: PropsType.array.isRequired
    }

    render() {
        const pathname = this.props.location.pathname
        const {navList} = this.props

        return (
            <TabBar>
                {
                    navList.map((nav, index) => {
                        return <Item key={index}
                                     title={nav.text}
                                     icon={{uri: require(`./imgs/${nav.icon}.png`)}}
                                     selectedIcon={{uri: require(`./imgs/${nav.icon}-selected.png`)}}
                                     selected={nav.path === pathname}
                                        onPress={() =>{this.props.history.replace(nav.path)}}/>
                    })
                }

            </TabBar>
        )
    }
}

export default withRouter(NavFooter)
