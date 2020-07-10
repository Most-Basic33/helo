import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Auth from './Components/Auth/Auth'

export default (
    <Switch>
        <Route component={Auth} path="/" exact />
    </Switch>
)