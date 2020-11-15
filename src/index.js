import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux'

import Register from "./containers/register/register";
import Main from "./containers/main/main";
import Login from "./containers/login/login";
import store from "./redux/store";

import './assets/css/index.less'
// import './test/SocketIO-test'


ReactDOM.render(<HashRouter>
    <Provider store={store}>
        <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route component={Main} />
        </Switch>
    </Provider>
</HashRouter>, document.querySelector('#root'))
