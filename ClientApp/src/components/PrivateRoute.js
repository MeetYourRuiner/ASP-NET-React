import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { API } from '../API';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        API.isAuthenticated()
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

export default PrivateRoute;