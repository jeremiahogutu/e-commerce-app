import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './main/Home'
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/" exact component={Home} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
