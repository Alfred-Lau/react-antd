import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from '../App';
import Profile from '../containers/Profile';
import Detail from '../containers/Detail';

export default class MainRouters extends Component {
    render() {
    //   Router只需要一个子元素
        return (
            <Router>
                <div>
                    <Route exact path='/' component={App}></Route>
                    <Route path='/profile' component={Profile}></Route>
                    <Route path='/detail/:id' component={Detail}></Route>
                </div>
            </Router>
        );
    }
}
