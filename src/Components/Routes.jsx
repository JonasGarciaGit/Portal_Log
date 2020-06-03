import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';

import Login from './Login';
import Home from '../Components/Home';
import {history} from './Historico';
import RotaPrivada from './RotaPrivada'

const Routes = () =>(
    <Router history={history}>
        <Switch>
            <Route component={Login} exact path="/portallogs" ></Route>
            <RotaPrivada component={Home} exact path="/portallogs/home"></RotaPrivada>
        </Switch>
    </Router>
)

export default Routes;