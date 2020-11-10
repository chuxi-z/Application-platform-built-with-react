import React from 'react'
import './logo.less'
import logo from './logo.png'


export default class Logo extends React.Component {

    render (){
        return(
            <div className="logo-container">
            <img src={logo} alt="logo" className='logo-img'/> </div>
    )}
}
